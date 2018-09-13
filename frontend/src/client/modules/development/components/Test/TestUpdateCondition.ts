import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

/** propTypes are used for optimizing stateless component updates only, and must include only props that it takes */
export const propTypes = {
    className: PropTypes.string,
};

/** HOC onlyUpdateForPropTypes should be fine for most cases.
 *  In weird situations use other HOCs: onlyUpdateForKeys, shouldUpdate or pure.
 */
const TestUpdateCondition = compose(
    onlyUpdateForPropTypes,
    setPropTypes(propTypes),
);

export { TestUpdateCondition };
