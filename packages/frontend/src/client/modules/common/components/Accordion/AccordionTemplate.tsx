import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';
import { Button } from '../Button';

interface Props extends CommonProps {
    rootRef: React.RefObject<HTMLDivElement>;
    collapseThreshold: number;
    isCollapseThresholdExceeded: boolean;
    isCollapsed: boolean;
    collapsedHeight: number;
    naturalHeight?: number;
    onToggleCollapsedStateClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface RootProps extends CommonProps {
    isCollapsed: boolean;
    isCollapseThresholdExceeded: boolean;
    collapsedHeight: number;
    collapseThreshold: number;
    naturalHeight?: number;
}

const AccordionTemplate: React.FC<Props> = ({
    className,
    rootRef,
    children,
    onToggleCollapsedStateClick,
    isCollapseThresholdExceeded,
    isCollapsed,
    collapsedHeight,
    naturalHeight,
    collapseThreshold,
}) => (
    <Root
        className={className}
        ref={rootRef}
        isCollapsed={isCollapsed}
        collapsedHeight={collapsedHeight}
        naturalHeight={naturalHeight}
        collapseThreshold={collapseThreshold}
        isCollapseThresholdExceeded={isCollapseThresholdExceeded}
    >
        {children}
        {isCollapseThresholdExceeded ? (
            <ToggleCollapsedStateButton onClick={onToggleCollapsedStateClick}>
                {isCollapsed ? '▼' : '▲'}
            </ToggleCollapsedStateButton>
        ) : null}
    </Root>
);

const Root = styled.div`
    height: ${({ isCollapseThresholdExceeded, isCollapsed, collapsedHeight, naturalHeight }: RootProps) =>
        // eslint-disable-next-line no-nested-ternary
        isCollapseThresholdExceeded && isCollapsed
            ? `${collapsedHeight}px`
            : naturalHeight
            ? `${naturalHeight}px`
            : 'auto'};

    /* Guarantee that initial height does not exceed collapseThreshold (good for SSR) */
    max-height: ${({ collapseThreshold, isCollapseThresholdExceeded }: RootProps) =>
        !isCollapseThresholdExceeded ? `${collapseThreshold}px` : 'none'};
    transition: height 0.2s ease-in-out;
    overflow: hidden;
    position: relative;
`;

const ToggleCollapsedStateButton = styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
`;

export { AccordionTemplate, Props };
