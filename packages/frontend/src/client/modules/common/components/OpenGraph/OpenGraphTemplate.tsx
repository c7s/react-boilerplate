import * as React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router';
import appleTouchIcon from '../../favicon/apple-touch-icon.png';

interface Props extends RouteComponentProps<{}> {
    /** Defaults to APP_NAME */
    title?: string;
    /** Defaults to website */
    type?: string;
    /** Relative or absolute path to image, defaults to favicon */
    image?: string;
    /** Defaults to current url without search (uses CANONICAL_ROBOTS_HOST) */
    url?: string;
    /** Defaults to APP_DESCRIPTION */
    description?: string;
    /** Defaults to ru_RU */
    locale?: string;
}

const OpenGraphTemplate: React.FC<Props> = ({
    title = APP_NAME,
    url,
    location,
    type = 'website',
    image = appleTouchIcon,
    description = APP_DESCRIPTION,
    locale = 'ru_RU',
}) => (
    <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta property={'og:title'} content={title} />
        <meta property={'og:type'} content={type} />
        <meta property={'og:image'} content={/^http/.test(image) ? image : `${global.CANONICAL_ROBOTS_HOST}${image}`} />
        <meta property={'og:url'} content={url ? url : `${global.CANONICAL_ROBOTS_HOST}${location.pathname}`} />
        <meta property={'og:description'} content={description} />
        <meta property={'og:locale'} content={locale} />
    </Helmet>
);

export { OpenGraphTemplate, Props };
