import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../../common/components/Button';
import { ComponentShowcase } from '../../../common/components/ComponentShowcase';
import { Link } from '../../../common/components/Link';
import { CommonProps } from '../../../common/types/CommonProps';

interface Props extends CommonProps {}

const ShowcasePageTemplate: React.FC<Props> = ({ className }) => (
    <Root className={className}>
        <ComponentShowcase
            name={'Button'}
            linkTo={
                'https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Button'
            }
            initialComponentDataProps={
                {
                    to: 'https://google.com',
                    children: 'Button with link to google',
                    disabled: false,
                    themeName: 'primary',
                } as any
            }
            component={Button}
        />
        <ComponentShowcase
            name={'Link'}
            linkTo={
                'https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Link'
            }
            initialComponentDataProps={
                {
                    to: 'https://google.com',
                    children: 'Link to google',
                    disabled: true,
                    themeName: 'text',
                } as any
            }
            component={Link}
        />
    </Root>
);

const Root = styled.div`
    min-height: 100%;

    /* NOT FOR PRODUCTION. Styled-components messes up types for ComponentShowcase (even more) */
    > :not(:first-child) {
        margin-top: 30px;
    }
`;

export { ShowcasePageTemplate, Props };
