import { Globber } from '@/lib/fs/glob/Globber.js';
import { glob as globbyGlobGlob } from 'glob';

export const glob: Globber = globbyGlobGlob;
