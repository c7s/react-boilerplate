import * as React from 'react';
import Helmet from 'react-helmet';
import appleTouchIcon from '../../favicon/apple-touch-icon.png';
import favicon16x16 from '../../favicon/favicon-16x16.png';
import favicon32x32 from '../../favicon/favicon-32x32.png';
import favicon from '../../favicon/favicon.ico';
import safariPinnedTab from '../../favicon/safari-pinned-tab.svg';
import { MIN_WIDTH } from '../../lib/media';
/** Generate files for manifest and msapplication-config favicon */
import '../../lib/server-templates/index';

const StaticHelmet: React.FC = () => {
    return (
        <Helmet>
            <html lang="ru" />
            <meta charSet="utf-8" />
            {/* Use content="width=device-width" to break everything for screens less than MIN_WIDTH */}
            {/* This will fix necessity to zoom-out though */}
            {/* Note: delay before click event is fixed by 'touch-action: manipulation;' */}
            <meta name="viewport" content={`width=${MIN_WIDTH}, initial-scale=1, maximum-scale=1`} />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />

            <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
            <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
            <link rel="mask-icon" href={safariPinnedTab} color="#31373d" />
            <link rel="shortcut icon" href={favicon} />
            <meta name="apple-mobile-web-app-title" content={APP_NAME} />
            <meta name="application-name" content={APP_NAME} />
            <meta name="msapplication-TileColor" content="#ebede8" />
            <meta name="theme-color" content="#ebede8" />

            <link rel="manifest" href={`${global.BASENAME}${WEB_MANIFEST_PATH}?${BUILD_TIMESTAMP}`} />
            <meta name="msapplication-config" content={`${global.BASENAME}${BROWSER_CONFIG_PATH}?${BUILD_TIMESTAMP}`} />

            <title>{APP_NAME}</title>
            <meta name="description" content={APP_DESCRIPTION} />
        </Helmet>
    );
};

export { StaticHelmet };
