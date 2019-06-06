import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../../../common/types/CommonProps';

interface Props extends CommonProps {
    header: string;
}

const Card: React.FC<Props> = ({ className, header, children }) => (
    <Root className={className}>
        <Header>{header}</Header>
        {children}
    </Root>
);

const Root = styled.div`
    padding: 20px;
    margin: 20px;
    background: #ffffff;
`;

const Header = styled.h2`
    margin-bottom: 20px;
    font-weight: bold;
`;

export { Card, Props };
