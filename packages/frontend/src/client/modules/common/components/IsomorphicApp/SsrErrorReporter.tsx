import * as React from 'react';
import { useAppDispatch } from '../AppStateProvider';

const SsrErrorReporter = () => {
    const appDispatch = useAppDispatch();

    React.useEffect(() => {
        if (global.SSR_ERROR) {
            appDispatch({ type: 'MESSAGE/ADD', value: global.SSR_ERROR });
        }
    }, [appDispatch]);

    return null;
};

export { SsrErrorReporter };
