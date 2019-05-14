import * as React from 'react';
import styled from 'styled-components';
import { Mode, useViewportSize } from '../../../../common/lib/react-hooks/useViewportSize';
import { CommonProps } from '../../../../common/types/CommonProps';

interface Props extends CommonProps {
    mode: Mode;
    includeVerticalScrollbar: boolean;
}

const ViewportDisplayTemplate: React.FC<Props> = ({ className, mode, includeVerticalScrollbar }) => {
    const { width, height } = useViewportSize({ mode, includeVerticalScrollbar });

    return (
        <Root className={className}>
            width: {width}; height: {height}
        </Root>
    );
};

const Root = styled.div``;

export { ViewportDisplayTemplate, Props };
