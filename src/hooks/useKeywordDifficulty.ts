import { DifficultyResponse, DifficultyResult } from '../../api/responseModels/difficultyResponse';
import { useCallback } from 'react';
import { useAsyncResource } from './useAsyncResource';

type Params = Readonly<{
  keyword: string;
  region: string;
}>;

export const useKeywordDifficulty = ({ keyword, region }: Params) => {
  const loadDifficulty = useCallback(() => loadKeywordDifficulty({ keyword, region })
    .then(res => {
      return res?.[0]?.difficulty ?? null;
    }), [keyword, region]);

  return useAsyncResource({ loadResource: loadDifficulty });
};

const loadKeywordDifficulty = (params: Params): Promise<ReadonlyArray<DifficultyResult> | null> =>
  fetch('.netlify/functions/difficulty', {
    method: 'POST',
    body: JSON.stringify({ keyword: params.keyword, selectedRegion: params.region }),
  })
    .then(async (response) => {
      if (response.ok) {
        const data: DifficultyResponse = await response.json();
        return data.results;
      }
      console.error(`Failed to fetch keyword difficulty: ${await response.text()}`);

      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
