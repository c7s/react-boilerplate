import autosize, { destroy, update } from 'autosize';
import * as React from 'react';
import styled from 'styled-components';
import { routes } from '../../lib/routes';
import { anchorForStickyHeader } from '../../lib/styles/anchorForStickyHeader';
import { Validator } from '../../lib/validators';
import { CommonProps } from '../../types/CommonProps';
import { Button } from '../Button';
import { Link, LinkThemeMode } from '../Link';
import { ErrorBoundary } from './ErrorBoundary';

interface Props<D extends {}, F extends {}> extends CommonProps {
    children?: React.ReactNode;
    component: React.ComponentType<D & F>;
    name: string;
    linkTo: string;
    initialComponentDataProps?: D;
    initialComponentFuncProps?: F;
    componentPropsValidators?: { [key in keyof D]: Validator };
}

const ComponentShowcase = <D extends {}, F extends {}>({
    className,
    children,
    component,
    name,
    linkTo,
    componentPropsValidators,
    initialComponentDataProps,
    initialComponentFuncProps,
}: Props<D, F>): React.ReactElement<any> | null => {
    const textAreaRef = React.createRef<HTMLTextAreaElement>();

    const [rawComponentDataProps, setRawComponentDataProps] = React.useState(
        JSON.stringify(initialComponentDataProps || {}, null, 4),
    );

    React.useEffect(() => {
        const currentTextArea = textAreaRef.current;

        if (currentTextArea) {
            autosize(currentTextArea);
        }

        return () => {
            if (currentTextArea) {
                destroy(currentTextArea);
            }
        };
    }, [textAreaRef]);

    React.useEffect(() => {
        if (textAreaRef.current) {
            update(textAreaRef.current);
        }
    });

    const onTextAreaChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            setRawComponentDataProps(JSON.stringify(JSON.parse(event.target.value), null, 4));
        } catch (error) {
            setRawComponentDataProps(event.target.value);
        }
    }, []);

    const onTextAreaReset = React.useCallback(() => {
        setRawComponentDataProps(JSON.stringify(initialComponentDataProps || {}, null, 4));
    }, [initialComponentDataProps]);

    return (
        <Root className={className}>
            <Header id={name}>
                <ComponentLink theme={{ mode: LinkThemeMode.TEXT }} to={linkTo}>
                    {name}
                </ComponentLink>
                <AnchorLink to={routes.SHOWCASE.pathWithParams({ hash: name })} smooth>
                    <span role="img" aria-label="Link">
                        🔗
                    </span>
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
                            React.createElement(component, { ...props, ...initialComponentFuncProps })
                        ) : (
                            <ErrorMessage>{errorMessage || 'Unexpected error'}</ErrorMessage>
                        )
                    }
                </ErrorBoundary>
                {children}
            </ComponentContainer>
        </Root>
    );
};

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
`;

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

export { ComponentShowcase, Props };
