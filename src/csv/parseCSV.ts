import { ParseError } from '@/csv/parseCSVUtils.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';
import { ko, ok, Result } from '@/lib/resultUtils.js';
import { ZodError } from 'zod';

export async function* parseCSV<H, T>(
    lines: AsyncGenerator<string>,
    {
        parseHeaders,
        parseLine,
    }: { parseHeaders: (header: string) => H; parseLine: (line: string, headersNameToIndex: H) => T }
): AsyncGenerator<Result<T, ParseError<unknown>>> {
    const headers = await lines.next();
    const headersNameToIndex = parseHeaders(headers.value as string);
    for await (const line of lines) {
        if (!line.trim()) {
            continue;
        }
        try {
            yield ok(parseLine(line, headersNameToIndex));
        } catch (e) {
            if (e instanceof ZodError) {
                yield ko(
                    new ParseError({
                        headers: headers.value as string,
                        line,
                        error: e,
                        data: e.issues,
                    })
                );
            } else if (e instanceof ValidationError) {
                yield ko(
                    new ParseError({
                        headers: headers.value as string,
                        line,
                        error: e,
                    })
                );
            } else {
                throw e;
            }
        }
    }
}
