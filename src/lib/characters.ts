// src/lib/characters.ts v5.0.0
import type { Character } from './character-types';
import { charactersPart1 } from './characters-part1';
import { charactersPart2 } from './characters-part2';

export type { Character } from './character-types';
export const characters: Character[] = [...charactersPart1, ...charactersPart2];
