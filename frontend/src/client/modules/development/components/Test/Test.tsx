import * as React from 'react';
import styled from 'styled-components';
import { InnerProps } from './TestType';

const Test: React.StatelessComponent<InnerProps> = ({ className, licenses, onClick }) => (
    <Root className={className}>
        Test
        {JSON.stringify(licenses.data)}
        <button onClick={onClick}>Click</button>
    </Root>
);

const Root = styled.div``;

export { Test };
