import * as React from 'react';
import styled from 'styled-components';
import { castError } from '../../lib/castError';
import { useAppDispatch, useAppState } from '../AppStateProvider';
import { Button } from '../Button';

// eslint-disable-next-line no-shadow
const Notificator: React.FC = () => {
    const { messages } = useAppState();
    const appDispatch = useAppDispatch();

    return (
        <Root>
            {Object.entries(messages).map(([key, message]) => {
                const castedError = castError(message);

                return (
                    <Message key={key}>
                        <Header>{castedError.header}</Header>
                        <Text>{castedError.text}</Text>
                        {castedError.details ? <Details>{castedError.details}</Details> : null}
                        <OkButton onClick={() => appDispatch({ type: 'MESSAGE/REMOVE', value: key })}>OK</OkButton>
                    </Message>
                );
            })}
        </Root>
    );
};

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

const Message = styled.div`
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const OkButton = styled(Button)`
    margin-top: 10px;
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

export { Notificator };
