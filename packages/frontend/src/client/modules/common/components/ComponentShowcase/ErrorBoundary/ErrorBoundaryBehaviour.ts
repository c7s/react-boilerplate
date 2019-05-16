import * as React from 'react';
import { castError } from '../../../lib/castError';
import { Validator } from '../../../lib/validators';
import { CommonProps } from '../../../types/CommonProps';

interface Props<T extends object> extends CommonProps {
    children: (parseResult: { props?: T; errorMessage?: string }) => React.ReactNode;
    rawComponentProps: string;
    componentPropsValidators?: { [key in keyof T]: Validator };
}

interface State {
    error: Error | null;
}

class ErrorBoundaryBehaviour<T extends object> extends React.Component<Props<T>, State> {
    public constructor(props: Props<T>) {
        super(props);

        this.state = {
            error: null,
        };
    }

    public componentDidUpdate(prevProps: Props<T>): void {
        if (prevProps.rawComponentProps !== this.props.rawComponentProps) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ error: null });
        }
    }

    public render() {
        if (this.state.error) {
            return this.props.children({ errorMessage: castError(this.state.error).details });
        }

        try {
            const componentProps = JSON.parse(this.props.rawComponentProps);
            const componentPropsValidationResult = this.validate(componentProps);

            return componentPropsValidationResult
                ? this.props.children({ errorMessage: componentPropsValidationResult })
                : this.props.children({ props: componentProps });
        } catch (error) {
            return this.props.children({ errorMessage: castError(error).details });
        }
    }

    public componentDidCatch(error: Error): void {
        this.setState({ error });
    }

    private validate(componentProps: T): string | undefined {
        let validationResult = '';

        Object.entries(componentProps).forEach(([propKey, prop]) => {
            const validationMessage =
                this.props.componentPropsValidators &&
                this.props.componentPropsValidators[propKey as keyof T] &&
                this.props.componentPropsValidators[propKey as keyof T](prop);

            if (validationMessage) {
                validationResult += `${propKey}: ${validationMessage}\n`;
            }
        });

        return validationResult === '' ? undefined : validationResult;
    }
}

export { ErrorBoundaryBehaviour, Props };
