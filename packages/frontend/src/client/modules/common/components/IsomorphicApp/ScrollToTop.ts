import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps<{}> {}

/** https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top */
class ScrollToTop extends React.Component<Props> {
    public componentDidUpdate(prevProps: Props) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    public render() {
        return this.props.children;
    }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

export { ScrollToTopWithRouter as ScrollToTop };
