import React, { AnchorHTMLAttributes } from 'react';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import styled, { css } from 'styled-components';
import { extractProps } from '../../lib/attributes-list';
import { anchorAttributesList } from '../../lib/attributes-list/attributes-list';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps, HashLinkProps {}

const LinkTemplate: React.FC<Props> = ({ className, smooth, scroll, to, replace, innerRef, ...props }) => {
    if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('//'))) {
        return <Anchor className={className} href={to} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    return (
        <StyledLink
            className={className}
            scroll={scroll || (el => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))}
            to={to}
            replace={replace}
            innerRef={innerRef}
            {...extractProps<AnchorHTMLAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement>>(
                props,
                anchorAttributesList,
            )}
        />
    );
};

const linkCss = css`
    text-decoration: none;
`;

const Anchor = styled.a`
    ${linkCss};
`;

const StyledLink = styled(HashLink)`
    ${linkCss};
`;

export { LinkTemplate, Props };
