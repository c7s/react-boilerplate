export { Width, mediaWidth } from './mediaWidth';
export { getWidth } from './getWidth';
import { observeResize } from './observeResize';

// This function must be called client-side only and immediately
if (!SSR_MODE) {
    observeResize();
}
