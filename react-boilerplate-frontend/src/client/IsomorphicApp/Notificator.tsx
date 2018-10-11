import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { StoreState } from '../IsomorphicStore';
import { onMessageRemove } from '../modules/common/store/actions';
import { Messages } from '../modules/common/store/types';

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
                {Object.entries(this.props.messages).map(([key]) => (
                    <Message>
                        <Header>Ошибка подключения к сети</Header>
                        <Text>Проверьте соединение с интернетом</Text>
                        <Button onClick={() => this.props.onMessageRemove(key)}>OK</Button>
                    </Message>
                ))}
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
    border: 2px solid #333333;
    opacity: 0.9;
`;

const Button = styled.button``;

const Header = styled.h1`
    margin: 0;
    font-size: 12px;
`;

const Text = styled.p`
    font-size: 10px;
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
