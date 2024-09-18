export type Downloader = (url: string, options: { directory?: string }) => Promise<void>;
