import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../IsomorphicStore';
import { LoadedFontStatus } from '../modules/common/store/types';

function withLoadedFontStatus<T>(
    component: React.ComponentClass<T & { loadedFontStatus: LoadedFontStatus }>,
): React.ComponentClass<T> {
    // TODO: remove any
    return connect<{ loadedFontStatus: LoadedFontStatus }, {}, T, State>(mapStateToProps)(component as any);
}

function mapStateToProps(state: State): { loadedFontStatus: LoadedFontStatus } {
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

export { withLoadedFontStatus };
