import * as React from 'react';
import styled, { css } from 'styled-components';
import { withTheme } from '../../lib/withTheme';
import { ToInnerCommonProps } from '../../lib/withTheme/withTheme';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';
import { Link, LinkProps } from '../Link';

type Props = CommonProps<ThemeName, HTMLButtonElement | HTMLAnchorElement> &
    (React.ButtonHTMLAttributes<HTMLButtonElement> | (Omit<LinkProps, keyof CommonProps>));

enum ThemeName {
    // Invisible, for wrapping blocks. Default, should be easy to override with custom styles.
    SEAMLESS = 'seamless',
    // Usual button
    PRIMARY = 'primary',
}

interface Theme {
    border: string;
}

const THEME_DICT: EnumedDict<ThemeName, Theme> = {
    [ThemeName.SEAMLESS]: {
        border: 'none',
    },
    [ThemeName.PRIMARY]: {
        border: '1px solid #000000',
    },
};

interface RootProps extends CommonInnerProps<Theme, HTMLButtonElement | HTMLAnchorElement> {
    disabled?: boolean;
}

const ButtonTemplate = withTheme<ThemeName, Theme, HTMLAnchorElement | HTMLButtonElement, Props>(THEME_DICT)(
    React.forwardRef<
        HTMLButtonElement | HTMLAnchorElement,
        ToInnerCommonProps<ThemeName, Theme, HTMLAnchorElement | HTMLButtonElement, Props>
    >((props, ref) =>
        isButtonProps(props) ? (
            <RootButton
                ref={ref as React.RefObject<HTMLButtonElement>}
                {...props as CommonInnerProps<Theme, HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>}
            />
        ) : (
            <RootLink
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...props as CommonInnerProps<Theme, HTMLAnchorElement> & (Omit<LinkProps, keyof CommonProps>)}
            />
        ),
    ),
);

function isButtonProps(
    props: CommonInnerProps<Theme> &
        (React.ButtonHTMLAttributes<HTMLButtonElement> | (Omit<LinkProps, keyof CommonProps>)),
): props is CommonInnerProps<Theme> & React.ButtonHTMLAttributes<HTMLButtonElement> {
    return (props as LinkProps).to === undefined;
}

const rootCss = css`
    display: inline-block;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 18px;
    color: inherit;
    text-decoration: none;
    border: ${({ theme }: RootProps) => theme!.border};
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

export { ButtonTemplate, Props, ThemeName };
