import { Grepper } from '@/lib/fs/grep/Grepper.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const grep: Grepper = async (patterns: string[], sourceFile: string, targetFile: string): Promise<void> => {
    const patternArgs = patterns.map(pattern => `-e '${pattern}'`).join(' ');
    const command = `(head -n 1 '${sourceFile}' && grep ${patternArgs} '${sourceFile}') > '${targetFile}'`;
    await execPromise(command);
};
