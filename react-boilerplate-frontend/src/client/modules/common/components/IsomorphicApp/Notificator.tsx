import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { castError } from '../../lib/castError';
import { StoreState } from '../../lib/IsomorphicStore';
import { onMessageRemove } from '../../store/actions';
import { Messages } from '../../store/types';

interface MapProps {
    messages: Messages;
}

interface DispatchProps {
    onMessageRemove(key: string): void;
}

class Notificator extends React.Component<MapProps & DispatchProps> {
    public render() {
        return (
            <Root>
                {Object.entries(this.props.messages).map(([key, message]) => {
                    const castedError = castError(message);

                    return (
                        <Message key={key}>
                            <Header>{castedError.header}</Header>
                            <Text>{castedError.text}</Text>
                            {castedError.details ? <Details>{castedError.details}</Details> : null}
                            <Button onClick={() => this.props.onMessageRemove(key)}>OK</Button>
                        </Message>
                    );
                })}
            </Root>
        );
    }
}

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const Message = styled.div`
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    margin-top: 10px;
    font-size: 14px;
    padding: 0;
`;

const Header = styled.h1`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
`;

const Text = styled.p`
    font-size: 12px;
    margin-bottom: 10px;
`;

const Details = styled.p`
    opacity: 0.5;
    font-size: 12px;
`;

function mapStateToProps(state: StoreState): MapProps {
    return {
        messages: state.common.messages,
    };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({ onMessageRemove }, dispatch);
}

const ConnectedNotificator = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notificator);

export { ConnectedNotificator as Notificator };
