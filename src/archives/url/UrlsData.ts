export interface UrlsData {
    data: {
        format: string;
        url: string;
        [key: string]: unknown;
    }[];

    [key: string]: unknown;
}
