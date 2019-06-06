import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';
import { Button } from '../Button';

interface Props extends CommonProps {
    collapseThreshold: number;
    collapsedHeight: number;
}

interface RootProps extends CommonProps {
    isCollapsed: boolean;
    isCollapseThresholdExceeded: boolean;
    collapsedHeight: number;
    collapseThreshold: number;
    naturalHeight?: number;
}

const Accordion: React.FC<Props> = ({ className, children, collapsedHeight, collapseThreshold }) => {
    const rootRef = React.createRef<HTMLDivElement>();
    const [isCollapseThresholdExceeded, setIsCollapseThresholdExceeded] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [naturalHeight, setNaturalHeight] = React.useState();

    React.useEffect(() => {
        let isCollapseThresholdExceededInner = false;
        let naturalHeightInner;

        if (rootRef.current) {
            naturalHeightInner = rootRef.current.scrollHeight;

            if (naturalHeightInner > collapseThreshold) {
                isCollapseThresholdExceededInner = true;
            }
        }

        setIsCollapseThresholdExceeded(isCollapseThresholdExceededInner);
        setNaturalHeight(naturalHeightInner);
    }, [collapseThreshold, rootRef]);

    const onToggleCollapsedStateClick = React.useCallback(() => {
        setIsCollapsed(isCollapsedInner => !isCollapsedInner);
    }, []);

    return (
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
};

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

export { Accordion, Props };
