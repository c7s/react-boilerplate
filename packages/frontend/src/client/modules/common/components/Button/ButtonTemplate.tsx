import * as React from 'react';
import styled, { css } from 'styled-components';
import { withTheme } from '../../lib/withTheme';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';
import { Link, LinkProps } from '../Link';

type Props = CommonProps<ThemeName> &
    (React.ButtonHTMLAttributes<HTMLButtonElement> | (Omit<LinkProps, keyof CommonProps>));

enum ThemeName {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface Theme {
    border: string;
}

const THEME_DICT: EnumedDict<ThemeName, Theme> = {
    [ThemeName.PRIMARY]: {
        border: '1px solid #000000',
    },
    [ThemeName.SECONDARY]: {
        border: '1px dashed #000000',
    },
};

interface RootProps extends CommonInnerProps<Theme> {
    disabled?: boolean;
}

const ButtonTemplate = withTheme<ThemeName, Theme, Props>(THEME_DICT)(props =>
    isButtonProps(props) ? (
        <RootButton {...props as CommonInnerProps<Theme> & React.ButtonHTMLAttributes<HTMLButtonElement>} />
    ) : (
        <RootLink {...props as CommonInnerProps<Theme> & (Omit<LinkProps, keyof CommonProps>)} />
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

    /* 'disabled' is not valid attribute for anchor tag, so this state is styled via prop */
    ${({ disabled }: RootProps) =>
        disabled
            ? css`
                  opacity: 0.5;
              `
            : ''};

    :active {
        opacity: 0.5;
    }

    :not(:active) {
        transition: opacity 0.2s ease-in-out;
    }
`;

const RootButton = styled.button`
    ${rootCss};
`;

const RootLink = styled(Link)`
    ${rootCss};
`;

export { ButtonTemplate, Props, ThemeName };
