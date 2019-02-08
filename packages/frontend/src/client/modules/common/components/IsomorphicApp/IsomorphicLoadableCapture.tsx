import * as React from 'react';
import Loadable from 'react-loadable';

interface Props {
    modules?: string[];
}

class IsomorphicLoadableCapture extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        if (SSR_MODE && !this.props.modules) {
            throw new Error('modules are required in SSR mode');
        }
    }

    public render() {
        return SSR_MODE ? (
            <Loadable.Capture
                report={module => {
                    this.props.modules!.push(module);
                }}
            >
                {this.props.children}
            </Loadable.Capture>
        ) : (
            this.props.children
        );
    }
}

export { IsomorphicLoadableCapture };
