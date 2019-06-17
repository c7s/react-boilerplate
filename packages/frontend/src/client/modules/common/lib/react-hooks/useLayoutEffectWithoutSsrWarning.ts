import * as React from 'react';

// TODO: Switch to official solution according to https://github.com/facebook/react/issues/14927
export const useLayoutEffectWithoutSsrWarning = SSR_MODE ? React.useEffect : React.useLayoutEffect;
