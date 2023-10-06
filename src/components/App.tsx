import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import { FC, useEffect, useState } from 'react';

import { EvaluateResponse, EvaluateResult } from '../../api/responseModels/evaluateResponse';
import { useKeywordsFromElement } from '../hooks/useKeywordsFromElement';
import { useConfig } from './ElementConfig';
import { EvaluationInputs } from './EvaluationInputs';
import { KeywordDetail } from './KeywordDetail';
import { KeywordDetailModalContainer } from './KeywordDetailModalContainer';
import { KeywordsTable } from './KeywordsTable';
import { SemrushLogo } from './SemrushLogo';

export const App: FC = () => {
  const config = useConfig();
  const [isEvaluationInProgress, setIsEvaluationInProgress] = useState(false);
  const [tableDataResponse, setTableDataResponse] = useState<EvaluateResponse | string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [selectedKeywordDetail, setSelectedKeywordDetail] = useState<EvaluateResult | null>(null);
  const keywords = useKeywordsFromElement();

  useEffect(() => {
    if (selectedKeywordDetail) {
      CustomElement.setHeight(760);
    }
    else {
      CustomElement.setHeight(500);
    }
  }, [selectedKeywordDetail]);

  const evaluate = (selectedRegion: string) => {
    setIsEvaluationInProgress(true);
    setRegion(selectedRegion);

    fetch('.netlify/functions/evaluate', {
      method: 'POST',
      body: JSON.stringify({
        keywords: keywords?.join(';'),
        selectedRegion,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data: EvaluateResponse = await response.json();
          setTableDataResponse(data);
        }
        else {
          const error = await response.text();
          console.error(`Could not evaluate the keywords: ${error}`);
          setTableDataResponse(error);
        }
      })
      .catch((err) => {
        console.log('Failed to fetch: ', err);
        setTableDataResponse(err.toString());
      })
      .finally(() => setIsEvaluationInProgress(false));
  };

  return (
    <Box
      p={2}
      sx={{ height: '100%' }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{ height: '100%' }}
      >
        <Stack
          direction="row"
          spacing={4}
        >
          <Typography sx={{ pt: '10px' }}>
            <strong>Keyword Analysis:</strong>
          </Typography>

          {!keywords
            ? (
              <Typography sx={{ pt: '10px' }}>
                Loading...
              </Typography>
            )
            : (
              <EvaluationInputs
                isLoading={isEvaluationInProgress}
                onSubmit={evaluate}
                isDisabled={!keywords}
              />
            )}
          <SemrushLogo
            height={40}
            width={200}
            position="left"
          />
        </Stack>

        <Divider sx={{ pt: '5px' }} />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >
          This extension reads and analyses keywords from a defined textfield. It can analyze up to 100 comma-separated
          phrases.
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >
          Currently reading from: <strong>{config.keywordsElementCodename}</strong>
        </Typography>
        <Divider />

        {typeof tableDataResponse === 'string'
          ? (
            <Alert severity="error">
              <AlertTitle>Error during evaluation</AlertTitle>
              {tableDataResponse}
            </Alert>
          )
          : region && tableDataResponse && (
            <KeywordsTable
              data={tableDataResponse}
              region={region}
              onKeywordSelected={setSelectedKeywordDetail}
            />
          )}
        {selectedKeywordDetail && region && (
          <KeywordDetailModalContainer
            region={region}
            evaluateResult={selectedKeywordDetail}
            onClose={() => setSelectedKeywordDetail(null)}
            renderContent={({ relatedKeywords, keywordVariations, difficulty }) => (
              <KeywordDetail
                evaluateResult={selectedKeywordDetail}
                difficulty={difficulty}
                relatedKeywords={relatedKeywords}
                keywordVariations={keywordVariations}
              />
            )}
          />
        )}
      </Stack>
    </Box>
  );
};

App.displayName = 'App';
