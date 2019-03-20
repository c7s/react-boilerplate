import * as React from 'react';
import styled from 'styled-components';
import { routes } from '../../lib/routes';
import { anchorForStickyHeader } from '../../lib/styles/anchorForStickyHeader';
import { Validator } from '../../lib/validators';
import { CommonProps } from '../../types/CommonProps';
import { Button, ButtonProps } from '../Button';
import { Link, LinkThemeName } from '../Link';
import { ErrorBoundary } from './ErrorBoundary';

interface Props<D extends {}, F extends {}> extends CommonProps {
    component: React.ComponentType<D & F>;
    onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onTextAreaReset: React.MouseEventHandler<HTMLButtonElement>;
    rawComponentDataProps: string;
    name: string;
    linkTo: string;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    initialComponentDataProps?: D;
    componentPropsValidators?: { [key in keyof D]: Validator };
    componentFuncProps?: F;
}

const ComponentShowcaseTemplate = <D extends {}, F extends {}>({
    className,
    component,
    onTextAreaChange,
    rawComponentDataProps,
    componentFuncProps,
    name,
    linkTo,
    componentPropsValidators,
    children,
    textAreaRef,
    onTextAreaReset,
    initialComponentDataProps,
}: Props<D, F>): React.ReactElement<any> | null => (
    <Root className={className}>
        <Header id={name}>
            <ComponentLink themeName={LinkThemeName.TEXT} to={linkTo}>
                {name}
            </ComponentLink>
            <AnchorLink to={routes.SHOWCASE.pathWithParams({ hash: name })} smooth>
                🔗
            </AnchorLink>
        </Header>
        <TextAreaContainer>
            {JSON.stringify(initialComponentDataProps || {}, null, 4) !== rawComponentDataProps ? (
                <ResetButton onClick={onTextAreaReset}>↻</ResetButton>
            ) : null}
            <TextArea ref={textAreaRef} onChange={onTextAreaChange} value={rawComponentDataProps} />
        </TextAreaContainer>
        <ComponentContainer>
            <ErrorBoundary<D>
                rawComponentProps={rawComponentDataProps}
                componentPropsValidators={componentPropsValidators}
            >
                {({ props, errorMessage }) =>
                    props ? (
                        React.createElement(component, { ...props, ...componentFuncProps })
                    ) : (
                        <ErrorMessage>{errorMessage || 'Unexpected error'}</ErrorMessage>
                    )
                }
            </ErrorBoundary>
            {children}
        </ComponentContainer>
    </Root>
);

const Root = styled.div``;

const ComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #c0c0c0;
`;

const ErrorMessage = styled.div`
    white-space: pre-line;
    color: #8b0000;
`;

const TextAreaContainer = styled.div`
    position: relative;
    width: 100%;
`;

// Similar issue: https://github.com/styled-components/styled-components/issues/1803
const ResetButton = styled(Button)`
    position: absolute;
    top: 0;
    left: 0;
` as React.ComponentType<ButtonProps>;

const TextArea = styled.textarea`
    width: 100%;
    resize: vertical;
    vertical-align: bottom;
    padding: 20px;
`;

const Header = styled.h2`
    padding: 20px;

    ${anchorForStickyHeader({ paddingTop: '20px' })};
`;

const ComponentLink = styled(Link)`
    :hover + * {
        opacity: 1;
    }
`;

const AnchorLink = styled(Link)`
    padding-left: 10px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    :hover,
    :focus {
        opacity: 1;
    }

    :active {
        opacity: 0.5;
    }
`;

export { ComponentShowcaseTemplate, Props };
