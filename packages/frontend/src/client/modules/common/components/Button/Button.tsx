import * as React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import { CommonProps } from '../../types/CommonProps';
import { Link, LinkProps } from '../Link';

type Props = CommonProps<Theme> &
    (React.ButtonHTMLAttributes<HTMLButtonElement> | (Omit<LinkProps, keyof CommonProps>));

interface Theme {
    mode: ThemeMode;
}

enum ThemeMode {
    // Invisible, for wrapping blocks. Default, should be easy to override with custom styles.
    SEAMLESS = 'seamless',
    // Usual button
    PRIMARY = 'primary',
}

interface RootProps extends CommonProps<Theme> {
    disabled?: boolean;
}

const DEFAULT_THEME: Theme = { mode: ThemeMode.SEAMLESS };

const Button = React.forwardRef((props: Props, ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>) => (
    <ThemeProvider theme={props.theme || DEFAULT_THEME}>
        {isButtonProps(props) ? (
            <RootButton ref={ref as React.RefObject<HTMLButtonElement>} {...props} />
        ) : (
            <RootLink ref={ref as React.Ref<HTMLAnchorElement>} {...props} />
        )}
    </ThemeProvider>
));

function isButtonProps(props: Props): props is CommonProps<Theme> & React.ButtonHTMLAttributes<HTMLButtonElement> {
    return (props as LinkProps).to === undefined;
}

const border = theme('mode', {
    [ThemeMode.SEAMLESS]: 'none',
    [ThemeMode.PRIMARY]: '1px solid #000000',
});

const rootCss = css`
    display: inline-block;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 18px;
    color: inherit;
    text-decoration: none;
    border: ${border};
    transition: opacity 0.2s ease-in-out;

    /* 'disabled' is not valid attribute for anchor tag, so this state is styled via prop */
    ${({ disabled }: RootProps) =>
        disabled
            ? css`
                  opacity: 0.5;
              `
            : ''};

    :active {
        opacity: 0.5;
        transition: none;
    }
`;

const RootButton = styled.button`
    ${rootCss};
`;

const RootLink = styled(Link)`
    ${rootCss};
`;

export { Button, Props, Theme, ThemeMode };
