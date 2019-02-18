import * as React from 'react';
import { castError } from '../../../lib/castError';
import { CommonProps } from '../../../types/CommonProps';

interface Props<T> extends CommonProps {
    children: (props: T) => React.ReactNode;
    rawComponentProps: string;
}

interface State {
    error: Error | null;
}

class ErrorBoundaryBehaviour<T> extends React.Component<Props<T>, State> {
    public constructor(props: Props<T>) {
        super(props);

        this.state = {
            error: null,
        };
    }

    public componentDidCatch(error: Error): void {
        this.setState({ error });
    }

    public render() {
        if (this.state.error) {
            return castError(this.state.error).details;
        }

        try {
            return this.props.children(JSON.parse(this.props.rawComponentProps));
        } catch (error) {
            return castError(error).details;
        }
    }

    public componentDidUpdate(prevProps: Props<T>): void {
        if (prevProps.rawComponentProps !== this.props.rawComponentProps) {
            this.setState({ error: null });
        }
    }
}

export { ErrorBoundaryBehaviour, Props };
