declare module 'no-scroll' {
    interface NoScroll {
        on(): void;
        off(): void;
        toggle(): void;
    }

    const noScroll: NoScroll;
    // eslint-disable-next-line import/no-default-export
    export default noScroll;
}
