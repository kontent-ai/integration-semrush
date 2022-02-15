import { FullSearchResponse, FullSearchResult } from '../../api/responseModels/fullSearchResponse';
import { useCallback } from 'react';
import { useAsyncResource } from './useAsyncResource';

type Params = Readonly<{
  keyword: string;
  region: string;
}>;

export const useKeywordVariations = ({ keyword, region }: Params) => {
  const loadVariations = useCallback(() => loadKeywordVariations({ region, keyword }), [keyword, region]);

  return useAsyncResource({ loadResource: loadVariations });
};

const loadKeywordVariations = (params: Params): Promise<ReadonlyArray<FullSearchResult> | null> =>
  fetch('.netlify/functions/fullsearch', {
    method: 'POST',
    body: JSON.stringify({ keyword: params.keyword, selectedRegion: params.region }),
  })
    .then(async (response) => {
      if (response.ok) {
        const data: FullSearchResponse = await response.json();
        return data.results;
      }
      console.log(`Failed to fetch keyword variations: ${await response.text()}`);
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
