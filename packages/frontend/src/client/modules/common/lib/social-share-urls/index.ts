import queryString from 'query-string';

export interface VkShareQuery {
    url: string;
    title?: string;
    image?: string;
    noparse?: boolean;
    no_vk_links?: 0 | 1;
}

export interface OkShareQuery {
    url: string;
    title?: string;
    imageUrl?: string;
}

export interface TwShareQuery {
    url: string;
    text?: string;
    hashtags?: string;
    via?: string;
}

export interface FbShareQuery {
    u: string;
}

// See: https://vk.com/dev/widget_share
export function vkUrl(query: VkShareQuery) {
    return `https://vk.com/share.php?${queryString.stringify(query)}`;
}

// See: https://apiok.ru/en/ext/like
export function okUrl(query: OkShareQuery) {
    return `https://connect.ok.ru/offer?${queryString.stringify(query)}`;
}

// See: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
export function twUrl(query: TwShareQuery) {
    return `https://twitter.com/intent/tweet?${queryString.stringify(query)}`;
}

// See: https://developers.facebook.com/x/bugs/357750474364812/
export function fbUrl(query: FbShareQuery) {
    return `https://www.facebook.com/sharer.php?${queryString.stringify(query)}`;
}
