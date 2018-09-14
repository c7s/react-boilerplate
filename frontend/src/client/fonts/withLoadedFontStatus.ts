import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../IsomorphicStore';
import { LoadedFontStatus } from '../modules/common/store/types';

function withLoadedFontStatus<T>(
    component: React.ComponentClass<T & { loadedFontStatus: LoadedFontStatus }>,
): React.ComponentClass<T> {
    // TODO: remove any
    return connect<{ loadedFontStatus: LoadedFontStatus }, {}, T, StoreState>(mapStateToProps)(component as any);
}

function mapStateToProps(state: StoreState): { loadedFontStatus: LoadedFontStatus } {
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

export { withLoadedFontStatus };
