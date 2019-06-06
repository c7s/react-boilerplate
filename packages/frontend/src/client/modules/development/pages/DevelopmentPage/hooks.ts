import * as React from 'react';

export const useCounter = () => {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const timerId = window.setInterval(() => {
            setCounter(currentCount => currentCount + 2);
        }, 1000);
        return () => {
            window.clearInterval(timerId);
        };
    }, []);

    const onDropCounterClick = React.useCallback(() => {
        setCounter(0);
    }, []);

    return { counter, onDropCounterClick };
};
