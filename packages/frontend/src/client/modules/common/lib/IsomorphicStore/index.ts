import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { CommonState } from '../../store/types';
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
            combineReducers({
                ...reducers,
            }),
            global.REDUX_STATE || {},
            composeWithDevTools(),
        );

        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(
                    combineReducers({
                        // eslint-disable-next-line global-require
                        ...require('./reducers').reducers,
                    }),
                );
            });
        }

        // eslint-disable-next-line no-return-assign
        return (IsomorphicStore.store = store);
    }
}

export { IsomorphicStore, StoreState };
