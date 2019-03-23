import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const FOOTER_HEIGHT = 50;

const FooterTemplate: React.FC<Props> = ({ className }) => <Root className={className}>{APP_NAME}</Root>;

const Root = styled.footer`
    width: 100%;
    height: ${`${FOOTER_HEIGHT}px`};
    position: absolute;
    bottom: 0;

    /* Temporal */
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #000000;
    font-weight: bold;
    background: #ffffff;
`;

export { FooterTemplate, Props, FOOTER_HEIGHT };
