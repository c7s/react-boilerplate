import * as React from 'react';
import styled from 'styled-components';

export interface Props {}
export interface State {
    error?: Error;
    info?: React.ErrorInfo;
}

export class RootErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ error, info });
    }

    render() {
        if (this.state.error) {
            return <ErrorContainer>Произошла ошибка</ErrorContainer>;
        }

        return this.props.children;
    }
}

const ErrorContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;
