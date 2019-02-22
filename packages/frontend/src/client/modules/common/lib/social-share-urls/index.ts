import queryString from 'query-string';

// See: https://vk.com/dev/widget_share
export function vk(query: { url: string; title?: string; image?: string; noparse?: boolean; no_vk_links?: 0 | 1 }) {
    return `https://vk.com/share.php?${queryString.stringify(query)}`;
}

// See: https://apiok.ru/en/ext/like
export function ok(query: { url: string; title?: string; imageUrl?: string }) {
    return `https://connect.ok.ru/offer?${queryString.stringify(query)}`;
}

// See: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
export function tw(query: { url: string; text?: string; hashtags?: string; via?: string }) {
    return `https://twitter.com/intent/tweet?${queryString.stringify(query)}`;
}

// See: https://developers.facebook.com/x/bugs/357750474364812/
export function fb(query: { u: string }) {
    return `https://www.facebook.com/sharer.php?${queryString.stringify(query)}`;
}
