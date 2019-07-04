import React, { AnchorHTMLAttributes } from 'react';
import { Location, LocationDescriptor, LocationDescriptorObject } from 'history';
// eslint-disable-next-line no-restricted-imports
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import { extractProps } from '../../lib/attributes-list';
import { anchorAttributesList } from '../../lib/attributes-list/attributes-list';
import { useReactRouter } from '../../lib/routes';
import { CommonProps } from '../../types/CommonProps';

type Props = CommonProps<Theme> &
    Omit<HashLinkProps, 'innerRef'> & {
        disabled?: boolean;
    };

interface Theme {
    mode: ThemeMode;
}

enum ThemeMode {
    // Invisible, for wrapping blocks. Button component relies on this to be default theme
    SEAMLESS = 'seamless',
    // Regular text link
    TEXT = 'text',
}

interface StyledLinkProps extends CommonProps<Theme> {
    disabled?: boolean;
}

const DEFAULT_THEME: Theme = {
    mode: ThemeMode.SEAMLESS,
};

const Link = React.forwardRef(
    (
        { className, smooth, scroll, to, replace, disabled, tabIndex, ...props }: Props,
        ref: React.Ref<HTMLAnchorElement>,
    ) => {
        const { location } = useReactRouter();

        return (
            <ThemeProvider theme={props.theme || DEFAULT_THEME}>
                {typeof to === 'string' && (to.startsWith('http') || to.startsWith('//')) ? (
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
                ) : (
                    <StyledLink
                        className={className}
                        scroll={
                            scroll ||
                            (el => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))
                        }
                        to={to}
                        replace={replace !== undefined ? replace : isSameLocation(location, to)}
                        innerRef={ref}
                        disabled={disabled}
                        tabIndex={disabled ? -1 : tabIndex} // Prevents disabled link from focusing and possible 'clicking'
                        {...extractProps<
                            AnchorHTMLAttributes<HTMLAnchorElement>,
                            AnchorHTMLAttributes<HTMLAnchorElement>
                        >(props, anchorAttributesList)}
                    />
                )}
            </ThemeProvider>
        );
    },
);

const linkCss = css`
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

    ${theme('mode', {
        [ThemeMode.SEAMLESS]: css`
            text-decoration: none;
            color: inherit;
        `,
        [ThemeMode.TEXT]: css`
            text-decoration: underline;
            color: #808080;
        `,
    })};
`;

const Anchor = styled.a`
    ${linkCss};
`;

const StyledLink = styled(HashLink)`
    ${linkCss};
`;

function isSameLocation(location: Location, to: LocationDescriptor): boolean {
    if (typeof to === 'string') {
        return isSameLocationString(location, to);
    }
    return isSameLocationObject(location, to);
}

function isSameLocationString(location: Location, to: string): boolean {
    return to === location.pathname + location.search + location.hash;
}

function isSameLocationObject(location: Location, to: LocationDescriptorObject) {
    return (
        (to.pathname || '') === location.pathname &&
        (to.search || '') === location.search &&
        (to.hash || '') === location.hash &&
        to.state === location.state
    );
}

export { Link, Props, ThemeMode };
