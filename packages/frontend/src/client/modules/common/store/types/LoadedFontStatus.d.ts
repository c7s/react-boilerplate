export interface FontVariant {
    weight: number | string;
    style: string;
    stretch: string;
}

export interface FontData {
    isAllVariantsAvailable: boolean;
    availableVariants: FontVariant[];
}

export interface LoadedFontStatus {
    [key: string]: FontData | undefined;
}
