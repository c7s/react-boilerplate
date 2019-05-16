import autobind from 'autobind-decorator';
import autosize, { destroy, update } from 'autosize';
import * as React from 'react';
import { Validator } from '../../lib/validators';
import { CommonProps } from '../../types/CommonProps';
import { ComponentShowcaseTemplate, Props as ComponentShowcaseTemplateProps } from './ComponentShowcaseTemplate';

interface Props<D extends {}, F extends {}> extends CommonProps {
    component: React.ComponentType<D & F>;
    name: string;
    linkTo: string;
    initialComponentDataProps?: D;
    initialComponentFuncProps?: F;
    componentPropsValidators?: { [key in keyof D]: Validator };
}

interface State {
    rawComponentDataProps: string;
}

class ComponentShowcaseBehaviour<D extends {}, F extends {}> extends React.Component<Props<D, F>, State> {
    private textAreaRef = React.createRef<HTMLTextAreaElement>();

    public constructor(props: Props<D, F>) {
        super(props);

        this.state = {
            rawComponentDataProps: JSON.stringify(this.props.initialComponentDataProps || {}, null, 4),
        };
    }

    public componentDidMount(): void {
        if (this.textAreaRef.current) {
            autosize(this.textAreaRef.current);
        }
    }

    public componentWillUnmount() {
        if (this.textAreaRef.current) {
            destroy(this.textAreaRef.current);
        }
    }

    public render() {
        return React.createElement<ComponentShowcaseTemplateProps<D, F>>(
            ComponentShowcaseTemplate as React.ComponentType<ComponentShowcaseTemplateProps<D, F>>,
            {
                ...this.props,
                ...this.state,
                onTextAreaChange: this.onTextAreaChange,
                onTextAreaReset: this.onTextAreaReset,
                componentFuncProps: this.props.initialComponentFuncProps,
                textAreaRef: this.textAreaRef,
            },
        );
    }

    @autobind
    private onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        try {
            this.setState(
                {
                    rawComponentDataProps: JSON.stringify(JSON.parse(event.target.value), null, 4),
                },
                () => {
                    if (this.textAreaRef.current) {
                        update(this.textAreaRef.current);
                    }
                },
            );
        } catch (error) {
            this.setState({ rawComponentDataProps: event.target.value });
        }
    }

    @autobind
    private onTextAreaReset() {
        this.setState(
            { rawComponentDataProps: JSON.stringify(this.props.initialComponentDataProps || {}, null, 4) },
            () => {
                if (this.textAreaRef.current) {
                    update(this.textAreaRef.current);
                }
            },
        );
    }
}

export { ComponentShowcaseBehaviour, Props };
