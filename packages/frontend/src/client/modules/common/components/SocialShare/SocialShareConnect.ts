import { withRouter } from '../../lib/withRouter';
import { CommonProps } from '../../types/CommonProps';
import { SocialShareTemplate } from './SocialShareTemplate';

interface Props extends CommonProps {
    url?: string;
}

const SocialShareConnect = withRouter(SocialShareTemplate);

export { SocialShareConnect, Props };
