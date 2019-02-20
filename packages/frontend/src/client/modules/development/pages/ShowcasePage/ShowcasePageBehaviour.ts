import autobind from 'autobind-decorator';
import * as React from 'react';
import { CommonProps } from '../../../common/types/CommonProps';
import { ShowcasePageTemplate } from './ShowcasePageTemplate';

interface Props extends CommonProps {}

interface State {
    isModalOpen: boolean;
}

class ShowcasePageBehaviour extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    public render() {
        return React.createElement(ShowcasePageTemplate, {
            ...this.props,
            ...this.state,
            onModalOpen: this.onModalOpen,
            onModalClose: this.onModalClose,
        });
    }

    @autobind
    private onModalOpen() {
        this.setState({ isModalOpen: true });
    }

    @autobind
    private onModalClose() {
        this.setState({ isModalOpen: false });
    }
}

export { ShowcasePageBehaviour, Props };
