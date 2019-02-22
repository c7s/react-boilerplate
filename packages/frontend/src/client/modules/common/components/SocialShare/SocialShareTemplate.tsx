import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { fb, ok, tw, vk } from '../../lib/social-share-urls';
import { CommonProps } from '../../types/CommonProps';
import { Button, ButtonProps } from '../Button';

/** Expand depending on your needs */
interface Props extends CommonProps, RouteComponentProps<{}> {
    url?: string;
}

const SocialShareTemplate: React.FC<Props> = ({ className, url, location }) => {
    const urlOrDefaultUrl = url ? url : `${global.CANONICAL_ROBOTS_HOST}${location.pathname}`;

    return (
        <Root className={className}>
            <SocialButton to={vk({ url: urlOrDefaultUrl })}>VK</SocialButton>
            <SocialButton to={ok({ url: urlOrDefaultUrl })}>OK</SocialButton>
            <SocialButton to={tw({ url: urlOrDefaultUrl })}>TW</SocialButton>
            <SocialButton to={fb({ u: urlOrDefaultUrl })}>FB</SocialButton>
        </Root>
    );
};

const Root = styled.div``;

const SocialButton = styled(Button)`
    margin: 0 10px;

    :first-child {
        margin-left: 0;
    }

    :last-child {
        margin-right: 0;
    }
` as React.ComponentType<ButtonProps>;

export { SocialShareTemplate, Props };
