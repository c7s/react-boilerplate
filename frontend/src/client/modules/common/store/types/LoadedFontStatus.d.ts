export interface FontVariant {
    weight: number | string;
    style: string;
    stretch: string;
}

export interface FontData {
    isAllVariantsAvailable: boolean;
    availableVariants: FontVariant[];
}

export type LoadedFontStatus = {
    fakeAllLoaded: FontData;
    [key: string]: FontData;
};
