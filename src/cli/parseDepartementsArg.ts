import { Departement } from '@/archives/departements/Departement.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export function parseDepartementsArg(arg?: string): Departement[] | undefined {
    if (!arg) {
        return undefined;
    }
    const departements = arg
        .split(',')
        .map(d => d.trim())
        .filter(d => d.length > 0)
        .map(d => {
            try {
                return Departement.of(d);
            } catch (e) {
                LoggerSingleton.getSingleton().error({ data: e });
                return null;
            }
        })
        .filter((d): d is Departement => d !== null);
    return departements.length > 0 ? departements : undefined;
}
