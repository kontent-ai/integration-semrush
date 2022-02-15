import { ParseResult } from './parseUtils';
import { ApiResponse, createParseResponse } from './apiResponse';

export type DifficultyResponse = ApiResponse<DifficultyResult>;

export type DifficultyResult = Readonly<{
  difficulty: number;
}>;

const parseDifficultyResult = (str: string): ParseResult<DifficultyResult> => {
  const [difficultyStr] = str.split(';');

  if (!difficultyStr) {
    return { type: 'error', error: 'Not enough columns returned.' };
  }

  const difficulty = Number(difficultyStr);

  if (isNaN(difficulty)) {
    return { type: 'error', error: 'Returned difficulty is not a valid number.' };
  }

  return {
    type: 'success',
    result: { difficulty },
  };
};

export const parseDifficultyResponse = createParseResponse(
  parseDifficultyResult,
  ['difficulty'],
);
