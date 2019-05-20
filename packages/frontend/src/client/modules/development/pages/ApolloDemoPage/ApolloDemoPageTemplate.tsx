import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../../../common/components/Page';
import { CommonProps } from '../../../common/types/CommonProps';
import { BookAuthorDisplay } from './BookAuthorDisplay';
import { BookTitleDisplay } from './BookTitleDisplay';

interface Props extends CommonProps {}

const ApolloDemoPageTemplate: React.FC<Props> = ({ className }) => (
    <Root className={className}>
        <BookAuthorDisplay />
        <BookTitleDisplay />
    </Root>
);

const Root = styled(Page)``;

export { ApolloDemoPageTemplate, Props };
