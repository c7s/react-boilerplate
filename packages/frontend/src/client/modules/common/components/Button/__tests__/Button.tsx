import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { IsomorphicRouter } from '../../IsomorphicApp/IsomorphicRouter';
import { Button, ButtonThemeMode } from '../index';

const BUTTON_LABEL = 'Test text';

afterEach(cleanup);

it('renders <button> by default', () => {
    const { getByText } = render(<Button>{BUTTON_LABEL}</Button>);

    expect(getByText(BUTTON_LABEL)).toBeInstanceOf(HTMLButtonElement);
});

it("renders <a> when 'to' is passed", () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Button to="https://google.com">{BUTTON_LABEL}</Button>
        </IsomorphicRouter>,
    );

    expect(getByText(BUTTON_LABEL)).toBeInstanceOf(HTMLAnchorElement);
});

it('accepts ref in <button> form', () => {
    const refObject = React.createRef<HTMLButtonElement>();

    const { getByText } = render(<Button ref={refObject}>{BUTTON_LABEL}</Button>);

    expect(getByText(BUTTON_LABEL)).toBe(refObject.current);
});

it('accepts ref in <a> form', () => {
    const refObject = React.createRef<HTMLAnchorElement>();

    const { getByText } = render(
        <IsomorphicRouter>
            <Button to="https://google.com" ref={refObject}>
                {BUTTON_LABEL}
            </Button>
        </IsomorphicRouter>,
    );

    expect(getByText(BUTTON_LABEL)).toBe(refObject.current);
});

it('passes usual <button> attributes to DOM', () => {
    const { getByText } = render(<Button type="reset">{BUTTON_LABEL}</Button>);

    expect(getByText(BUTTON_LABEL).getAttribute('type')).toBe('reset');
});

it('passes usual <a> attributes to DOM', () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Button to="https://google.com" download>
                {BUTTON_LABEL}
            </Button>
        </IsomorphicRouter>,
    );

    expect(getByText(BUTTON_LABEL).getAttributeNames()).toContain('download');
});

it("has 'seamless' as default theme (styles are easily overridable by default)", () => {
    const { getAllByText } = render(
        <React.Fragment>
            <Button>{BUTTON_LABEL}</Button>
            {/* Intentional refactor-proof name */}
            <Button theme={{ mode: 'seamless' as ButtonThemeMode }}>{BUTTON_LABEL}</Button>
        </React.Fragment>,
    );
    const buttons = getAllByText(BUTTON_LABEL);

    expect(buttons[0]).toEqual(buttons[1]);
});
