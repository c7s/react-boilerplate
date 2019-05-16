import autobind from 'autobind-decorator';
import * as React from 'react';
import { CommonProps } from '../../types/CommonProps';
import { AccordionTemplate } from './AccordionTemplate';

interface Props extends CommonProps {
    collapseThreshold: number;
    collapsedHeight: number;
}

interface State {
    isCollapseThresholdExceeded: boolean;
    isCollapsed: boolean;
    naturalHeight?: number;
}

class AccordionBehaviour extends React.Component<Props, State> {
    private rootRef = React.createRef<HTMLDivElement>();

    public constructor(props: Props) {
        super(props);

        this.state = {
            isCollapseThresholdExceeded: false,
            isCollapsed: true,
        };
    }

    public componentDidMount(): void {
        this.setState(this.getClientSpecificStatePart());
    }

    public componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.collapseThreshold !== this.props.collapseThreshold) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(this.getClientSpecificStatePart());
        }
    }

    public render() {
        return React.createElement(AccordionTemplate, {
            ...this.props,
            ...this.state,
            onToggleCollapsedStateClick: this.onToggleCollapsedStateClick,
            rootRef: this.rootRef,
        });
    }

    @autobind
    private onToggleCollapsedStateClick() {
        this.setState(({ isCollapsed }) => ({ isCollapsed: !isCollapsed }));
    }

    private getClientSpecificStatePart(): Omit<State, 'isCollapsed'> {
        let isCollapseThresholdExceeded = false;
        let naturalHeight;

        if (this.rootRef.current) {
            naturalHeight = this.rootRef.current.scrollHeight;

            if (naturalHeight > this.props.collapseThreshold) {
                isCollapseThresholdExceeded = true;
            }
        }

        return { isCollapseThresholdExceeded, naturalHeight };
    }
}

export { AccordionBehaviour, Props };
