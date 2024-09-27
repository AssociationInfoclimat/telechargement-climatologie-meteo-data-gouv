export function getCSVName(csv: string): string {
    return csv.split('/').pop()!.split('.').shift()!;
}
