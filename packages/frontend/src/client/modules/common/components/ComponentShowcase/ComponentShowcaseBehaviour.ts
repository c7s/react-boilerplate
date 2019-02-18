import autobind from 'autobind-decorator';
import * as React from 'react';
import { CommonProps } from '../../types/CommonProps';
import { ComponentShowcaseTemplate, Props as ComponentShowcaseTemplateProps } from './ComponentShowcaseTemplate';

interface Props<D extends {}, F extends {}> extends CommonProps {
    component: React.ComponentType<D & F>;
    name: string;
    linkTo: string;
    initialComponentDataProps?: D;
    initialComponentFuncProps?: F;
}

interface State {
    rawComponentDataProps: string;
}

class ComponentShowcaseBehaviour<D extends {}, F extends {}> extends React.Component<Props<D, F>, State> {
    public constructor(props: Props<D, F>) {
        super(props);

        this.state = {
            rawComponentDataProps: this.props.initialComponentDataProps
                ? JSON.stringify(this.props.initialComponentDataProps, null, 4)
                : '',
        };
    }

    public render() {
        return React.createElement<ComponentShowcaseTemplateProps<D, F>>(
            ComponentShowcaseTemplate as React.ComponentType<ComponentShowcaseTemplateProps<D, F>>,
            {
                ...this.props,
                ...this.state,
                onTextAreaChange: this.onTextAreaChange,
                componentFuncProps: this.props.initialComponentFuncProps,
            },
        );
    }

    @autobind
    private onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        try {
            this.setState({
                rawComponentDataProps: JSON.stringify(JSON.parse(event.target.value), null, 4),
            });
        } catch (error) {
            this.setState({ rawComponentDataProps: event.target.value });
        }
    }
}

export { ComponentShowcaseBehaviour, Props };
