import { ApiResponse, createParseResponse } from './apiResponse';
import { ParseResult } from './parseUtils';

export type RelatedResponse = ApiResponse<RelatedResult>;

export type RelatedResult = Readonly<{
  keyword: string;
  searchVolume: number;
}>;

const parseRelatedResult = (str: string): ParseResult<RelatedResult> => {
  const [keyword, searchVolumeStr] = str.split(';');

  if (!keyword || !searchVolumeStr) {
    return { type: 'error', error: 'Not enough columns returned.' };
  }

  const searchVolume = Number(searchVolumeStr);
  if (isNaN(searchVolume)) {
    return { type: 'error', error: '"searchVolume" column is not a valid number.' };
  }

  return {
    type: 'success',
    result: {
      keyword,
      searchVolume,
    },
  };
};

export const parseRelatedResponse = createParseResponse(
  parseRelatedResult,
  ['keyword', 'searchVolume'],
);
