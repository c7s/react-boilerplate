import { combineReducers, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState, { mergePersistedState } from 'redux-localstorage';
import { getLocalStorage } from './getLocalStorage';
import { CommonState } from './modules/common/store/types/index';
import { reducers } from './reducers';

interface State {
    common: CommonState;
}

class IsomorphicStore {
    private static store: Store<State> | null;

    public static getStore({ ssrMode }: { ssrMode: boolean }): Store<State> {
        if (ssrMode) {
            return createStore(
                combineReducers({
                    ...reducers,
                }),
            );
        }

        if (IsomorphicStore.store) {
            return IsomorphicStore.store;
        }

        const store = createStore(
            compose(mergePersistedState())(
                combineReducers({
                    ...reducers,
                }),
            ),
            REDUX_STATE,
            composeWithDevTools(persistState(getLocalStorage(), 'reduxStoreLocalPart')),
        );

        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(
                    combineReducers({
                        ...require('./reducers').reducers,
                    }),
                );
            });
        }

        return (IsomorphicStore.store = store);
    }
}

export { IsomorphicStore, State };
