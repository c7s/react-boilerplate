declare module 'no-scroll' {
    interface NoScroll {
        on(): void;
        off(): void;
        toggle(): void;
    }

    const noScroll: NoScroll;
    export default noScroll;
}
