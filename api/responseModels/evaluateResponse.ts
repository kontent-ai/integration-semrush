import { ParseResult } from './parseUtils';
import { ApiResponse, createParseResponse } from './apiResponse';

export type EvaluateResponse = ApiResponse<EvaluateResult>;

export type EvaluateResult = Readonly<{
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  numberOfResults: number;
  trends: ReadonlyArray<number>;
}>;

const parseEvaluateResult = (str: string): ParseResult<EvaluateResult> => {
  const [keyword, searchVolumeStr, cpcStr, competitionStr, numberOfResultsStr, trendsStr] = str.split(';');

  if (!keyword || !searchVolumeStr || !cpcStr || !competitionStr || !numberOfResultsStr || trendsStr === undefined) {
    return { type: 'error', error: 'Not enough columns returned.' };
  }

  const [searchVolume, cpc, competition, numberOfResults] = [searchVolumeStr, cpcStr, competitionStr, numberOfResultsStr].map(Number);

  if (isNaN(searchVolume) || isNaN(cpc) || isNaN(competition) || isNaN(numberOfResults)) {
    return { type: 'error', error: 'Some number columns are invalid numbers.' };
  }

  const trends = trendsStr.split(',').map(Number);

  if (trends.some(isNaN)) {
    return { type: 'error', error: 'Trends column contains invalid numbers.' };
  }

  return {
    type: 'success',
    result: {
      keyword,
      searchVolume,
      cpc,
      competition,
      numberOfResults,
      trends,
    },
  };
};

export const parseEvaluateResponse = createParseResponse(
  parseEvaluateResult,
  ['keyword', 'searchVolume', 'cpc', 'competition', 'numberOfResults', 'trends'],
);
