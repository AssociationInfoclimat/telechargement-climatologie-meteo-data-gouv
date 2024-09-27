import { getCSVName } from '@/csv/getCSVName.js';
import { describe, expect, it } from 'vitest';

describe('getCSVName', () => {
    it('should extract the csv name', () => {
        expect(
            getCSVName(
                '/Users/jlecordier/Infoclimat/telechargement-climatologie-meteo-data-gouv/data/Q_01_latest-2023-2024_RR-T-Vent.csv'
            )
        ).toEqual('Q_01_latest-2023-2024_RR-T-Vent');
    });
});
