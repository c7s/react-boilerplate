import { withRouter } from 'react-router';
import { OpenGraphTemplate } from './OpenGraphTemplate';

interface Props {
    title: string;
    type?: string;
    image?: string;
    url?: string;
    description?: string;
    locale?: string;
}

const OpenGraphConnect = withRouter(OpenGraphTemplate);

export { OpenGraphConnect, Props };
