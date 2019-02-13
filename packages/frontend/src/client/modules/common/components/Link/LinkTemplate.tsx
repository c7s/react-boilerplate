import React, { AnchorHTMLAttributes } from 'react';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { extractProps } from '../../lib/attributes-list';
import { anchorAttributesList } from '../../lib/attributes-list/attributes-list';
import { withTheme } from '../../lib/withTheme';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps<ThemeName>, HashLinkProps {
    disabled?: boolean;
}

enum ThemeName {
    // Invisible, for wrapping blocks. Button component relies on this to be default theme
    SEAMLESS = 'seamless',
    // Regular text link
    TEXT = 'text',
}

interface Theme {
    textDecoration: string;
    color: string;
    disabledOpacity: string;
}

const THEME_DICT: EnumedDict<ThemeName, Theme> = {
    [ThemeName.SEAMLESS]: {
        textDecoration: 'none',
        color: 'inherit',
        disabledOpacity: '1',
    },
    [ThemeName.TEXT]: {
        textDecoration: 'underscore',
        color: '#808080',
        disabledOpacity: '0.5',
    },
};

interface StyledLinkProps extends CommonInnerProps<Theme> {
    disabled?: boolean;
}

const LinkTemplate = withTheme<ThemeName, Theme, Props>(THEME_DICT)(
    ({ className, smooth, scroll, to, replace, innerRef, ...props }) => {
        if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('//'))) {
            return <Anchor className={className} href={to} target="_blank" rel="noopener noreferrer" {...props} />;
        }

        return (
            <StyledLink
                className={className}
                scroll={scroll || (el => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))}
                to={to}
                replace={replace}
                innerRef={innerRef}
                {...extractProps<AnchorHTMLAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement>>(
                    props,
                    anchorAttributesList,
                )}
            />
        );
    },
);

const linkCss = css`
    text-decoration: ${({ theme }: StyledLinkProps) => theme!.textDecoration};
    color: ${({ theme }: StyledLinkProps) => theme!.color};

    ${({ disabled }: StyledLinkProps) =>
        disabled
            ? css`
                  pointer-events: none;
                  opacity: ${({ theme }: StyledLinkProps) => theme!.disabledOpacity};
              `
            : ''};
`;

const Anchor = styled.a`
    ${linkCss};
`;

const StyledLink = styled(HashLink)`
    ${linkCss};
`;

export { LinkTemplate, Props, ThemeName };
