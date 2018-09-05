import autobind from 'autobind-decorator';
import * as React from 'react';
import { hot } from 'react-hot-loader';

export interface Props {
    name: string;
}
export interface State {
    counter: number;
}

class App extends React.Component<Props, State> {
    timer: number | null;
    constructor(props: Props) {
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
        return (
            <div>
                Greetings, {this.props.name}:{this.state.counter}
                <button onClick={this.onClick}>Droppy</button>
            </div>
        );
    }
}

export const HotApp = hot(module)(App);
