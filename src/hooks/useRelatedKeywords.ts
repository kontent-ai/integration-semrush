import { useCallback } from 'react';
import { RelatedResponse, RelatedResult } from '../../api/responseModels/relatedResponse';
import { useAsyncResource } from './useAsyncResource';

type Params = Readonly<{
  keyword: string;
  region: string;
}>;

export const useRelatedKeywords = ({ keyword, region }: Params) => {
  const loadRelated = useCallback(() => loadKeywordRelated({ region, keyword }), [keyword, region]);

  return useAsyncResource({ loadResource: loadRelated });
};

const loadKeywordRelated = (params: Params): Promise<ReadonlyArray<RelatedResult> | null> =>
  fetch('.netlify/functions/related', {
    method: 'POST',
    body: JSON.stringify({ keyword: params.keyword, selectedRegion: params.region }),
  })
    .then(async (response) => {
      if (response.ok) {
        const data: RelatedResponse = await response.json();
        return data.results;
      }
      console.error(`Failed to fetch related keywords: ${await response.text()}`);
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
