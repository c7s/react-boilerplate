import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../../../IsomorphicStore';
import { OuterPropsStore, Store, StoreUpdaters } from './TestType';

const TestStore = connect<Store, StoreUpdaters, OuterPropsStore, State>(
    mapStateToProps,
    mapDispatchToProps,
);

function mapStateToProps(state: State, ownProps: OuterPropsStore): Store {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OuterPropsStore): StoreUpdaters {
    return bindActionCreators({}, dispatch);
}

export { TestStore };
