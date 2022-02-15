import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { EvaluateResponse, EvaluateResult } from '../../api/responseModels/evaluateResponse';

type Props = Readonly<{
  region: string;
  data: EvaluateResponse;
  onKeywordSelected: (keyword: EvaluateResult) => void;
}>;

export const KeywordsTable: FC<Props> = props => {
  return (
    <TableContainer sx={{ height: '100%' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>{props.data.schema.keyword}</strong>
            </TableCell>
            <TableCell>
              <strong>{props.data.schema.searchVolume}</strong>
            </TableCell>
            <TableCell>
              <strong>{props.data.schema.cpc}</strong>
            </TableCell>
            <TableCell>
              <strong>{props.data.schema.competition}</strong>
            </TableCell>
            <TableCell>
              <strong>{props.data.schema.numberOfResults}</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.results.map(result => (
            <ResultRow
              key={result.keyword}
              result={result}
              onClick={() => props.onKeywordSelected(result)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type ResultRowProps = Readonly<{
  result: EvaluateResult;
  onClick: () => void;
}>;

const ResultRow: FC<ResultRowProps> = props => (
  <TableRow
    key={props.result.keyword}
    hover
    tabIndex={-1}
    onClick={props.onClick}
    sx={{ cursor: 'pointer' }}
  >
    <TableCell>
      {props.result.keyword}
    </TableCell>
    <TableCell>
      {abbreviateNumber(props.result.searchVolume)}
    </TableCell>
    <TableCell>
      {abbreviateNumber(props.result.cpc)}
    </TableCell>
    <TableCell>
      {props.result.competition}
    </TableCell>
    <TableCell>
      {abbreviateNumber(props.result.numberOfResults)}
    </TableCell>
  </TableRow>
);

ResultRow.displayName = 'ResultRow';
