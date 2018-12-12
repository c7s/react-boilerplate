import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../../common/lib/routes';
import { CommonInnerProps, CommonProps } from '../../../common/types/CommonProps';

interface Props extends CurrentCommonProps {}

type CurrentCommonProps = CommonProps;
type CurrentInnerCommonProps = CommonInnerProps;

const RootPageTemplate: React.StatelessComponent<Props> = ({ className }) => (
    <Root className={className}>
        <Header>React-boilerplate</Header>
        <Link
            to={routes.DEVELOPMENT.pathWithParams({
                name: 'Sir',
                id: '1',
                query: { querySingle: 'queryValue', queryArray: ['array'] },
            })}
        >
            Development
        </Link>
    </Root>
);

const Root = styled.div``;

const Header = styled.h1``;

export { RootPageTemplate, Props, CurrentCommonProps, CurrentInnerCommonProps };
