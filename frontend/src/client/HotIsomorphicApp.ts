import { hot } from 'react-hot-loader';
import { IsomorphicApp } from './IsomorphicApp';

// 'hot' HOC breaks apollo SSR, so separate client-side HotIsomorphicApp is needed

export const HotIsomorphicApp = hot(module)(IsomorphicApp);
