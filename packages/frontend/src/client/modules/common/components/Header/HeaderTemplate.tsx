import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const HEADER_HEIGHT = 50;

const HeaderTemplate: React.FC<Props> = ({ className }) => <Root className={className}>{APP_NAME}</Root>;

const Root = styled.header`
    width: 100%;
    height: ${`${HEADER_HEIGHT}px`};
    position: fixed;
    top: 0;

    /* Temporal */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    font-weight: bold;
    background: #ffffff;
`;

export { HeaderTemplate, Props, HEADER_HEIGHT };
