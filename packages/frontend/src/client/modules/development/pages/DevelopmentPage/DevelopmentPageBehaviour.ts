import autobind from 'autobind-decorator';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { LoadedFontStatus, Message } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import { CurrentCommonProps, DevelopmentPageTemplate } from './DevelopmentPageTemplate';

/** Props to render component behaviour. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    licenses: QueryResult<Partial<Licenses>>;
    loadedFontStatus: LoadedFontStatus;
    name?: string;
    id: string;
    querySingle?: string;
    queryArray?: string[];
    onMessageAdd(message: Message): void;
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

    public componentDidMount() {
        this.timer = window.setInterval(() => {
            this.setState(({ counter }) => ({
                counter: counter + 2,
            }));
        }, 1000);
    }

    public componentDidUpdate(prevProps: Props): void {
        if (this.props.licenses.error && !prevProps.licenses.error) {
            this.props.onMessageAdd(this.props.licenses.error);
        }
    }

    public componentWillUnmount() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
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
