import { FC, ReactNode } from 'react';

import { EvaluateResult } from '../../api/responseModels/evaluateResponse';
import { useKeywordDifficulty } from '../hooks/useKeywordDifficulty';
import { useKeywordVariations } from '../hooks/useKeywordVariations';
import { useRelatedKeywords } from '../hooks/useRelatedKeywords';
import { Modal } from './Modal';
import { SemrushLogo } from './SemrushLogo';

type Props = Readonly<{
  onClose: () => void;
  region: string;
  evaluateResult: EvaluateResult;
  renderContent: (data: ProvidedData) => ReactNode;
}>;

type ProvidedData = Readonly<{
  difficulty: number | null;
  relatedKeywords: ReadonlyArray<Readonly<{ keyword: string; searchVolume: number }>> | null;
  keywordVariations: ReadonlyArray<Readonly<{ keyword: string; searchVolume: number }>> | null;
}>;

export const KeywordDetailModalContainer: FC<Props> = props => {
  const params = {
    keyword: props.evaluateResult.keyword,
    region: props.region,
  };

  const difficultyResult = useKeywordDifficulty(params);
  const relatedKeywordsResult = useRelatedKeywords(params);
  const keywordVariationsResult = useKeywordVariations(params);

  const isLoaded = !difficultyResult.isLoading && !relatedKeywordsResult.isLoading && !keywordVariationsResult.isLoading;

  return (
    <Modal
      leadingElement={(
        <a
          href={`https://www.semrush.com/analytics/keywordmagic/?q=${props.evaluateResult.keyword}&db=${props.region}`}
          target="blank"
        >
          <SemrushLogo
            height={40}
            width={150}
            position="center"
          />
        </a>
      )}
      onClose={props.onClose}
      isLoading={!isLoaded}
    >
      {isLoaded && props.renderContent({
        difficulty: difficultyResult.value,
        relatedKeywords: relatedKeywordsResult.value,
        keywordVariations: keywordVariationsResult.value,
      })}
    </Modal>
  );
};
