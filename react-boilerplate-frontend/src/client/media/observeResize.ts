import { throttle } from 'lodash';
import { IsomorphicStore } from '../IsomorphicStore';
import { onMediaExactWidthChange } from '../modules/common/store/actions';

export function observeResize() {
    const throttledDispatch = throttle(IsomorphicStore.getStore().dispatch, 500);

    throttledDispatch(onMediaExactWidthChange(document.documentElement.clientWidth));
    window.addEventListener('resize', () =>
        throttledDispatch(onMediaExactWidthChange(document.documentElement.clientWidth)),
    );
}
