import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../../../IsomorphicStore';
import { Store, StoreUpdaters, PropsExternal } from './TestType';

const TestStore = connect<Store, StoreUpdaters, OuterProps, State>(
    mapStateToProps,
    mapDispatchToProps,
);

function mapStateToProps(state: State, ownProps: OuterProps): Store {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OuterProps): StoreUpdaters {
    return bindActionCreators({}, dispatch);
}

type OuterProps = PropsExternal;

export { TestStore };
