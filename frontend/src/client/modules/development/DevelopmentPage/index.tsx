import autobind from 'autobind-decorator';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { Licenses } from './DevelopmentPageGraphql';

export interface Props {}

export interface State {
    counter: number;
}

class DevelopmentPage extends React.Component<Props, State> {
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
            <Query query={Licenses}>
                {result => (
                    <div>
                        Greetings:
                        {this.state.counter}
                        <button onClick={this.onClick}>Droppy</button>
                        <div>
                            {JSON.stringify(result.data)}, {JSON.stringify(result.error)},{' '}
                            {JSON.stringify(result.loading)}
                        </div>
                        <Link to={routes.ROOT.path}>Root</Link>
                    </div>
                )}
            </Query>
        );
    }
}

export { DevelopmentPage };
