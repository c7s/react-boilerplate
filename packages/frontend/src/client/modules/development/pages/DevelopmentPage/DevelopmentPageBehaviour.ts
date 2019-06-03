import autobind from 'autobind-decorator';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { routes } from '../../../common/lib/routes';
import { Books } from './ApolloTypes/Books';
import { CurrentCommonProps, DevelopmentPageTemplate } from './DevelopmentPageTemplate';

/** Props to render component behaviour. Don't forget to extend CurrentCommonProps */

interface Props
    extends CurrentCommonProps,
        RouteComponentProps<FirstArgument<typeof routes.DEVELOPMENT.pathWithParams>> {
    booksQueryResult: QueryResult<Partial<Books>>;
}

interface State {
    counter: number;
    isModalOpen: boolean;
}

class DevelopmentPageBehaviour extends React.Component<Props, State> {
    private timer: number | null;

    public constructor(props: Props) {
        super(props);
        this.state = {
            counter: 0,
            isModalOpen: false,
        };
        this.timer = null;
    }

    public componentDidMount() {
        this.timer = window.setInterval(() => {
            this.setState(({ counter }) => ({
                counter: counter + 2,
            }));
        }, 1000);
    }

    public componentWillUnmount() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    public render() {
        return React.createElement(DevelopmentPageTemplate, {
            onClick: this.onClick,
            onOpenModalClick: this.onOpenModalClick,
            onModalRequestClose: this.onModalRequestClose,
            /** It may be handy to just pass everything forward */
            ...this.state,
            ...this.props,
            /** Can't specify 'theme' here */
        });
    }

    @autobind
    private onClick() {
        this.setState({ counter: 0 });
    }

    @autobind
    private onOpenModalClick() {
        this.setState({ isModalOpen: true });
    }

    @autobind
    private onModalRequestClose() {
        this.setState({ isModalOpen: false });
    }
}

/** Single export is mandatory */

export { DevelopmentPageBehaviour, Props };
