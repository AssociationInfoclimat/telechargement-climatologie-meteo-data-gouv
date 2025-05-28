export type DateGrepper = ({
    sourceFile,
    targetFile,
    startDate,
    endDate,
}: {
    sourceFile: string;
    targetFile: string;
    startDate: Date;
    endDate: Date;
}) => Promise<void>;
