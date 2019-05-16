import * as React from 'react';
import styled from 'styled-components';
import { castError } from '../../lib/castError';

export interface Props {}
export interface State {
    error?: Error;
    info?: React.ErrorInfo;
}

export class RootErrorBoundary extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error, info });
    }

    public render() {
        if (this.state.error) {
            const castedError = castError(this.state.error);
            return (
                <ErrorContainer>
                    <Header>{castedError.header}</Header>
                    <Text>{castedError.text}</Text>
                    {castedError.details ? <Details>{castedError.details}</Details> : null}
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

const ErrorContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Header = styled.h1`
    font-weight: bold;
    margin-bottom: 10px;
`;

const Text = styled.p`
    margin-bottom: 10px;
`;

const Details = styled.p`
    opacity: 0.5;
`;
