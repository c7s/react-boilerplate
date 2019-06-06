import { withRouter } from 'react-router';
import { OpenGraph } from './OpenGraph';

interface Props {
    title: string;
    type?: string;
    image?: string;
    url?: string;
    description?: string;
    locale?: string;
}

const OpenGraphConnect = withRouter(OpenGraph);

export { OpenGraphConnect, Props };
