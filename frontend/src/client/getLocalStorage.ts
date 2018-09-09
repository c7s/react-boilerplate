import filter from 'redux-localstorage-filter';
import adapter from 'redux-localstorage/lib/adapters/localStorage';

export function getLocalStorage() {
    return filter(['common.isRootVisited'])(adapter(window.localStorage));
}
