import { hot } from 'react-hot-loader';
import { IsomorphicApp } from './IsomorphicApp';

/**
 * HOC 'hot' breaks apollo SSR and requires to have it in separate (from client entry point) file.
 * It's also impossible to move it to ./IsomorphicApp for whatever reasons (it breaks tslint).
 */
export const HotIsomorphicApp = hot(module)(IsomorphicApp);
