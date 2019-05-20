import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../../../common/components/Page';
import { CommonProps } from '../../../common/types/CommonProps';
import { BookAuthorDisplay } from './BookAuthorDisplay';
import { BookTitleDisplay } from './BookTitleDisplay';
import { Card } from './Card';
import { CurrentTimestampDisplay } from './CurrentTimestampDisplay';

interface Props extends CommonProps {}

const ApolloDemoPageTemplate: React.FC<Props> = ({ className }) => (
    <Root className={className}>
        <Card header="Debatched query, known/unknown error example">
            <CurrentTimestampDisplay />
        </Card>
        <Card header="Batched queries (see Network tab)">
            <BookAuthorDisplay />
            <BookTitleDisplay />
        </Card>
    </Root>
);

const Root = styled(Page)``;

export { ApolloDemoPageTemplate, Props };
