import { combineReducers, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState, { mergePersistedState } from 'redux-localstorage';
import { CommonState } from '../../store/types';
import { getLocalStorage } from './getLocalStorage';
import { reducers } from './reducers';

interface StoreState {
    common: CommonState;
}

class IsomorphicStore {
    private static store: Store<StoreState> | null;

    public static getStore(): Store<StoreState> {
        if (SSR_MODE) {
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
            global.REDUX_STATE || {},
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

export { IsomorphicStore, StoreState };
