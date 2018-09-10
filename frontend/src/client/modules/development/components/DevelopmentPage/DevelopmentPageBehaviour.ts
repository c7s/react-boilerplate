import autobind from 'autobind-decorator';
import * as React from 'react';
import { DevelopmentPage } from './DevelopmentPage';
import { DevelopmentPageBehaviourProps, DevelopmentPageBehaviourState } from './DevelopmentPageTypes';

class DevelopmentPageBehaviour extends React.Component<DevelopmentPageBehaviourProps, DevelopmentPageBehaviourState> {
    timer: number | null;
    constructor(props: DevelopmentPageBehaviourProps) {
        super(props);
        this.state = {
            counter: 0,
        };
        this.timer = null;
    }

    componentDidMount() {
        this.timer = window.setInterval(() => {
            this.setState(({ counter }) => ({
                counter: counter + 2,
            }));
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    @autobind
    onClick() {
        this.setState({ counter: 0 });
    }

    render() {
        return React.createElement(DevelopmentPage, {
            counter: this.state.counter,
            onClick: this.onClick,
            licenses: this.props.licenses,
        });
    }
}

export { DevelopmentPageBehaviour };
