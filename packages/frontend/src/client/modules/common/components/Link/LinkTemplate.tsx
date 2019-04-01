import React, { AnchorHTMLAttributes } from 'react';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { extractProps } from '../../lib/attributes-list';
import { anchorAttributesList } from '../../lib/attributes-list/attributes-list';
import { withTheme } from '../../lib/withTheme';
import { ToInnerCommonProps } from '../../lib/withTheme/withTheme';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';

type Props = CommonProps<ThemeName, HTMLAnchorElement> &
    Omit<HashLinkProps, 'innerRef'> & {
        disabled?: boolean;
    };

enum ThemeName {
    // Invisible, for wrapping blocks. Button component relies on this to be default theme
    SEAMLESS = 'seamless',
    // Regular text link
    TEXT = 'text',
}

interface Theme {
    textDecoration: string;
    color: string;
}

const THEME_DICT: EnumedDict<ThemeName, Theme> = {
    [ThemeName.SEAMLESS]: {
        textDecoration: 'none',
        color: 'inherit',
    },
    [ThemeName.TEXT]: {
        textDecoration: 'underline',
        color: '#808080',
    },
};

interface StyledLinkProps extends CommonInnerProps<Theme> {
    disabled?: boolean;
}

const LinkTemplate = withTheme<ThemeName, Theme, HTMLAnchorElement, Props>(THEME_DICT)(
    React.forwardRef<HTMLAnchorElement, ToInnerCommonProps<ThemeName, Theme, HTMLAnchorElement, Props>>(
        ({ className, smooth, scroll, to, replace, disabled, tabIndex, ...props }, ref) => {
            if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('//'))) {
                return (
                    <Anchor
                        ref={ref}
                        className={className}
                        href={to}
                        target="_blank"
                        rel="noopener noreferrer" // See https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c
                        disabled={disabled}
                        tabIndex={disabled ? -1 : tabIndex} // Prevents disabled link from focusing and possible 'clicking'
                        {...props}
                    />
                );
            }

            return (
                <StyledLink
                    className={className}
                    scroll={
                        scroll || (el => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))
                    }
                    to={to}
                    replace={replace}
                    // TODO: Remove any (types are broken)
                    innerRef={ref as any}
                    disabled={disabled}
                    tabIndex={disabled ? -1 : tabIndex} // Prevents disabled link from focusing and possible 'clicking'
                    {...extractProps<AnchorHTMLAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement>>(
                        props,
                        anchorAttributesList,
                    )}
                />
            );
        },
    ),
);

const linkCss = css`
    text-decoration: ${({ theme }: StyledLinkProps) => theme!.textDecoration};
    color: ${({ theme }: StyledLinkProps) => theme!.color};
    transition: opacity 0.2s ease-in-out;

    ${({ disabled }: StyledLinkProps) =>
        disabled
            ? css`
                  pointer-events: none;
                  opacity: 0.5;
              `
            : ''};

    :active {
        opacity: 0.5;
        transition: none;
    }
`;

const Anchor = styled.a`
    ${linkCss};
`;

const StyledLink = styled(HashLink)`
    ${linkCss};
`;

export { LinkTemplate, Props, ThemeName };
