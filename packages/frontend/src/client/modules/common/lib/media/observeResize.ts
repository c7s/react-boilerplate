import { throttle } from 'lodash';
import { onMediaExactWidthChange } from '../../store/actions';
import { IsomorphicStore } from '../IsomorphicStore';

export function observeResize() {
    const throttledDispatch = throttle(IsomorphicStore.getStore().dispatch, 500);

    throttledDispatch(onMediaExactWidthChange(document.documentElement.clientWidth));
    window.addEventListener('resize', () =>
        throttledDispatch(onMediaExactWidthChange(document.documentElement.clientWidth)),
    );
}
