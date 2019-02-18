import * as React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../../types/CommonProps';
import { Link, LinkThemeName } from '../Link';
import { ErrorBoundary } from './ErrorBoundary';

interface Props<D extends {}, F extends {}> extends CommonProps {
    component: React.ComponentType<D & F>;
    onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    rawComponentDataProps: string;
    name: string;
    linkTo: string;
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
}: Props<D, F>): React.ReactElement<any> | null => (
    <Root className={className}>
        <Positionedlink themeName={LinkThemeName.TEXT} to={linkTo}>
            {name}
        </Positionedlink>
        <TextArea onChange={onTextAreaChange} value={rawComponentDataProps} />
        <ComponentContainer>
            <ErrorBoundary<D> rawComponentProps={rawComponentDataProps}>
                {componentDataProps => React.createElement(component, { ...componentDataProps, ...componentFuncProps })}
            </ErrorBoundary>
        </ComponentContainer>
    </Root>
);

const Root = styled.div`
    display: flex;
    flex-direction: column;
`;

const ComponentContainer = styled.div`
    display: flex;
    padding: 20px;
    background-color: #c0c0c0;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px;
    resize: vertical;
    vertical-align: bottom;
    padding: 20px;
`;

const Positionedlink = styled(Link)`
    display: block;
    margin: 20px;
`;

export { ComponentShowcaseTemplate, Props };
