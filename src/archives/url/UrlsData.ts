export interface UrlsData {
    data: {
        url: string;
        [key: string]: unknown;
    }[];

    [key: string]: unknown;
}
