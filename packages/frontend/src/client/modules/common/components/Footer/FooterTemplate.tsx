import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const FooterTemplate: React.FC<Props> = ({ className }) => <Root className={className}>{APP_NAME}</Root>;

const Root = styled.div`
    width: 100%;
    margin-top: auto;

    /* Temporal */
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #000000;
    font-weight: bold;
    background: #ffffff;
`;

export { FooterTemplate, Props };
