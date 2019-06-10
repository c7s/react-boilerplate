import React from 'react';

export function useIsClientSide() {
    const [isClientSide, setIsClientSide] = React.useState(false);

    React.useEffect(() => {
        setIsClientSide(true);
    }, []);

    return isClientSide;
}
