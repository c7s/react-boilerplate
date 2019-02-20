import * as React from 'react';
import ResponsiveModal from 'react-responsive-modal';
import { createGlobalStyle } from 'styled-components';
import { CommonProps } from '../../types/CommonProps';

interface Props extends ExtractProps<typeof ResponsiveModal>, CommonProps {}

const ModalTemplate: React.FC<Props> = props => (
    <React.Fragment>
        <ResponsiveModalGlobalStyle />
        <ResponsiveModal {...props} classNames={{ overlay: 'responsive-modal-overlay' }} />
    </React.Fragment>
);

const ResponsiveModalGlobalStyle = createGlobalStyle`
    .responsive-modal-overlay {
        -webkit-overflow-scrolling: touch;
    }
`;

export { ModalTemplate, Props };
