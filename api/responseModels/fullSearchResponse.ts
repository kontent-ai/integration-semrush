import { ApiResponse, createParseResponse } from './apiResponse';
import { ParseResult } from './parseUtils';

export type FullSearchResponse = ApiResponse<FullSearchResult>;

export type FullSearchResult = Readonly<{
  keyword: string;
  searchVolume: number;
}>;

const parseFullSearchResult = (str: string): ParseResult<FullSearchResult> => {
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

export const parseFullSearchResponse = createParseResponse(
  parseFullSearchResult,
  ['keyword', 'searchVolume'],
);
