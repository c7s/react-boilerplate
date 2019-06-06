import { withRouter } from '../../lib/withRouter';
import { CommonProps } from '../../types/CommonProps';
import { SocialShare } from './SocialShare';

interface Props extends CommonProps {
    url?: string;
}

const SocialShareConnect = withRouter(SocialShare);

export { SocialShareConnect, Props };
