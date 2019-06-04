import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Button, ButtonThemeName } from '../index';

afterEach(cleanup);

it('renders <button> by default', () => {
    const { getByText } = render(<Button>Test text</Button>);

    expect(getByText('Test text')).toBeInstanceOf(HTMLButtonElement);
});

it("renders <a> when 'to' is passed", () => {
    const { getByText } = render(<Button to="https://google.com">Test text</Button>);

    expect(getByText('Test text')).toBeInstanceOf(HTMLAnchorElement);
});

it('accepts ref in <button> form', () => {
    const refObject = React.createRef<HTMLButtonElement>();

    const { getByText } = render(<Button ref={refObject}>Test text</Button>);

    expect(getByText('Test text')).toBe(refObject.current);
});

it('accepts ref in <a> form', () => {
    const refObject = React.createRef<HTMLAnchorElement>();

    const { getByText } = render(
        <Button to="https://google.com" ref={refObject}>
            Test text
        </Button>,
    );

    expect(getByText('Test text')).toBe(refObject.current);
});

it('passes usual <button> attributes to DOM', () => {
    const { getByText } = render(<Button type="reset">Test text</Button>);

    expect(getByText('Test text').getAttribute('type')).toBe('reset');
});

it('passes usual <a> attributes to DOM', () => {
    const { getByText } = render(
        <Button to="https://google.com" download>
            Test text
        </Button>,
    );

    expect(getByText('Test text').getAttributeNames()).toContain('download');
});

it("has 'seamless' as default theme (styles are easily overridable by default)", () => {
    const { getAllByText } = render(
        <React.Fragment>
            <Button>Test text</Button>
            {/* Intentional refactor-proof name */}
            <Button themeName={'seamless' as ButtonThemeName}>Test text</Button>
        </React.Fragment>,
    );
    const buttons = getAllByText('Test text');

    expect(buttons[0]).toEqual(buttons[1]);
});
