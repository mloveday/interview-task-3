export type Album = {
    album_type: string,
    artists: Array<{
        external_urls: {[k: string]: string},
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string,
    }>,
    available_markets: string[],
    external_urls: {[k: string]: string},
    href: string,
    id: string,
    images: Array<{
        height: number,
        width: number,
        url: string,
    }>,
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string,
}