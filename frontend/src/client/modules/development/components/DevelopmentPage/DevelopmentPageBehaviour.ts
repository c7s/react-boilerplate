import autobind from 'autobind-decorator';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { StyledComponentsProps } from '../../../common/lib/BaseProps';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import { DevelopmentPage, ThemeName } from './DevelopmentPage';

export interface Props extends StyledComponentsProps<ThemeName> {
    licenses: QueryResult<Partial<Licenses>>;
    loadedFontStatus: LoadedFontStatus;
    onRootVisit(): void;
    name?: string;
    id: string;
}

export interface State {
    counter: number;
}

class DevelopmentPageBehaviour extends React.Component<Props, State> {
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
        return React.createElement(DevelopmentPage, {
            onClick: this.onClick,
            ...this.state,
            ...this.props,
        });
    }
}

export { DevelopmentPageBehaviour };
