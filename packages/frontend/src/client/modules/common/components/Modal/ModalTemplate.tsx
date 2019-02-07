import * as React from 'react';
import ResponsiveModal from 'react-responsive-modal';
import { CommonProps } from '../../types/CommonProps';

interface Props extends ExtractProps<typeof ResponsiveModal>, CommonProps {}

const ModalTemplate: React.FC<Props> = props => <ResponsiveModal {...props} />;

export { ModalTemplate, Props };
