import * as React from 'react';
import styled from 'styled-components';
import { CurrentStyledComponentsInnerProps, PropsApollo, PropsBehaviour, PropsExternal, PropsStore } from './TestType';

const Test: React.StatelessComponent<OuterProps> = ({ className, licenses }) => (
    <Root className={className}>
        {JSON.stringify(licenses)}
        {JSON.stringify(licenses.data)}
    </Root>
);

const Root = styled.div`
    /* internal styles here */
`;

type OuterProps = Omit<
    PropsExternal & PropsStore & PropsApollo & PropsBehaviour & CurrentStyledComponentsInnerProps,
    'themeType'
>;

export { Test };
