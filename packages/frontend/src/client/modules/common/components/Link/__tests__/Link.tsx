import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { IsomorphicRouter } from '../../IsomorphicApp/IsomorphicRouter';
import { Link } from '../index';

const LINK_LABEL = 'Test text';

afterEach(cleanup);

it('renders <a>', () => {
    const { getByText } = render(<Link to="https://google.com">{LINK_LABEL}</Link>);

    expect(getByText(LINK_LABEL)).toBeInstanceOf(HTMLAnchorElement);
});

it('handles absolute URLs', () => {
    const { getByText } = render(<Link to="https://google.com">{LINK_LABEL}</Link>);

    expect(getByText(LINK_LABEL).getAttribute('href')).toBe('https://google.com');
});

it('handles relative URLs', () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Link to="/relative">{LINK_LABEL}</Link>
        </IsomorphicRouter>,
    );

    expect(getByText(LINK_LABEL).getAttribute('href')).toBe('/relative');
});

it('autofixes relative URLs', () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Link to="relative">{LINK_LABEL}</Link>
        </IsomorphicRouter>,
    );

    expect(getByText(LINK_LABEL).getAttribute('href')).toBe('/relative');
});

it('opens absolute URLs in new tab', () => {
    const { getByText } = render(<Link to="https://google.com">{LINK_LABEL}</Link>);

    expect(getByText(LINK_LABEL).getAttribute('target')).toBe('_blank');
});

it('opens relative URLs according to default preference', () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Link to="/relative">{LINK_LABEL}</Link>
        </IsomorphicRouter>,
    );

    expect(getByText(LINK_LABEL).getAttributeNames()).not.toContain('target');
});

it("is immune to 'target=_blank' vulnerability", () => {
    const { getByText } = render(<Link to="https://google.com">{LINK_LABEL}</Link>);

    expect(getByText(LINK_LABEL).getAttribute('rel')).toBe('noopener noreferrer');
});

it("doesn't fix 'target=_blank' vulnerability on relative links", () => {
    const { getByText } = render(
        <IsomorphicRouter>
            <Link to="/relative">{LINK_LABEL}</Link>
        </IsomorphicRouter>,
    );

    expect(getByText(LINK_LABEL).getAttributeNames()).not.toContain('rel');
});

it('accepts ref for absolute URLs', () => {
    const refObject = React.createRef<HTMLAnchorElement>();

    const { getByText } = render(
        <Link ref={refObject} to="https://google.com">
            {LINK_LABEL}
        </Link>,
    );

    expect(getByText(LINK_LABEL)).toBe(refObject.current);
});

it('accepts ref for relative URLs', () => {
    const refObject = React.createRef<HTMLAnchorElement>();

    const { getByText } = render(
        <IsomorphicRouter>
            <Link ref={refObject} to="/relative">
                {LINK_LABEL}
            </Link>
        </IsomorphicRouter>,
    );

    expect(getByText(LINK_LABEL)).toBe(refObject.current);
});

it('passes usual <a> attributes to DOM', () => {
    const { getByText } = render(
        <Link to="https://google.com" download>
            {LINK_LABEL}
        </Link>,
    );

    expect(getByText(LINK_LABEL).getAttributeNames()).toContain('download');
});

it('can be disabled', () => {
    const { getByText } = render(
        <Link to="https://google.com" disabled>
            {LINK_LABEL}
        </Link>,
    );

    // Testing implementation detail due to lack of reliable way to test it from user's perspective
    expect(getComputedStyle(getByText(LINK_LABEL)).pointerEvents).toBe('none');
    expect(getByText(LINK_LABEL).getAttribute('tabIndex')).toBe('-1');
});
