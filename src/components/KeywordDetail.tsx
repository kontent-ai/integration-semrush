import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Bar, BarChart, Tooltip as ChartTooltip } from 'recharts';
import { FC, ReactNode } from 'react';
import { EvaluateResult } from '../../api/responseModels/evaluateResponse';

type Props = Readonly<{
  evaluateResult: EvaluateResult;
  difficulty: number | null;
  relatedKeywords: ReadonlyArray<Readonly<{ keyword: string; searchVolume: number }>> | null;
  keywordVariations: ReadonlyArray<Readonly<{ keyword: string; searchVolume: number }>> | null;
}>;

export const KeywordDetail: FC<Props> = props => (
  <Stack spacing={1}>
    <Stack
      direction="row"
      spacing={1}
    >
      <StyledBox>
        <BoxSection
          tooltipText="The searched for keyword"
          headline="Keyword/phrase"
          value={props.evaluateResult.keyword}
        />
        <BoxSection
          tooltipText="The average number of times users have searched for a given keyword per month. We calculate this value over the last 12 months."
          headline="Volume"
          value={abbreviateNumber(props.evaluateResult.searchVolume)}
        />
        {props.difficulty !== null && (
          <BoxSection
            withProgress={true}
            tooltipText="An estimate of how difficult it would be to rank well in organic search results for a particular keyword. The higher the percentage, the harder it is to achieve high rankings for the given keyword."
            headline="Keyword Difficulty"
            value={props.difficulty}
          />
        )}
      </StyledBox>
      <StyledBox>
        <BoxSection
          tooltipText="The total number of organic results returned for a given keyword at the last date of collection."
          headline="Results"
          value={abbreviateNumber(props.evaluateResult.numberOfResults)}
        />
        <BoxSection
          tooltipText="Average price in US dollars advertisers pay for a user's click on an ad containing a particular keyword (Google AdWords)."
          headline="CPC"
          value={'$' + abbreviateNumber(props.evaluateResult.cpc)}
        />
        <BoxSection
          tooltipText="Competitive density of advertisers using the given term for their ads. One (1) means the highest competition."
          headline="Competition"
          value={props.evaluateResult.competition}
        />
      </StyledBox>
      <StyledBox>
        <>
          <Tooltip
            title="The total number of organic results returned for a given keyword at the last date of collection."
            arrow
          >
            <Typography variant="caption">
              Trend
            </Typography>
          </Tooltip>
        </>
        <Box sx={{ paddingTop: '20px' }}>
          <BarChart width={250} height={100} data={props.evaluateResult.trends.map(trend => ({ trend }))}>
            <ChartTooltip />
            <Bar dataKey="trend" fill="#a6c8ff" />
          </BarChart>
        </Box>

      </StyledBox>
    </Stack>

    <Stack
      direction="row"
      spacing={3}
    >
      {props.keywordVariations && (
        <StyledBox>
          <>
            <Tooltip
              title="Any variation of your seed keyword or keyword phrase in any order."
              arrow
            >
              <Typography>
              </Typography>
            </Tooltip>
            <SearchVolumeKeywordTable rows={props.keywordVariations} header="Keyword Variations" />
          </>
        </StyledBox>
      )}
      {props.relatedKeywords && (
        <StyledBox>
          <>
            <Tooltip
              title="Related keywords, synonyms, and variations relevant to a queried term."
              arrow
            >
              <Typography>
              </Typography>
            </Tooltip>
            <SearchVolumeKeywordTable rows={props.relatedKeywords} header="Related Keywords" />
          </>
        </StyledBox>
      )}
    </Stack>
  </Stack>
);

type StyledBoxProps = Readonly<{
  children: ReactNode;
  customFlex?: string;
}>;

const StyledBox: FC<StyledBoxProps> = props => (
  <Stack
    sx={{
      border: 'solid 1px rgba(0,0,0,0.12)',
      borderRadius: '8px',
      flex: props.customFlex ?? '1 1 0',
    }}
    p={1}
    spacing={1}
    divider={<Divider orientation="horizontal" flexItem />}
  >
    {props.children}
  </Stack>
);

type BoxSectionProps = Readonly<{
  tooltipText: string;
  headline: string;
}> & Readonly<{ value: string | number; withProgress?: false } | { value: number; withProgress: true }>;

const BoxSection: FC<BoxSectionProps> = props => (
  <Stack>
    <Tooltip
      title={props.tooltipText}
      arrow
    >
      <Typography variant="caption">
        {props.headline}
      </Typography>
    </Tooltip>
    <Stack
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {props.withProgress && (
        <AbsolutelyCentered>
          <CircularProgress
            variant="determinate"
            value={props.value}
            sx={{ color: createProgressColour(props.value) }}
          />
        </AbsolutelyCentered>
      )}
      {props.withProgress
        ? (
          <Typography variant="caption" component="div" color="text.secondary">
            <strong>{props.value}</strong>
          </Typography>
        )
        : (
          <Typography variant="subtitle1">
            <strong>{props.value}</strong>
          </Typography>
        )}
    </Stack>
  </Stack>
);

const AbsolutelyCentered: FC<Readonly<{ children: ReactNode }>> = props => (
  <Box
    sx={{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {props.children}
  </Box>
);

const createProgressColour = (progress: number) => {
  if (progress < 30) {
    return 'green';
  }
  if (progress < 50) {
    return 'yellow';
  }
  if (progress < 70) {
    return 'orange';
  }
  return 'red';
};

type SimpleTableProps = Readonly<{
  rows: ReadonlyArray<Readonly<{ keyword: string; searchVolume: number }>>;
  header: string;
}>;

const SearchVolumeKeywordTable: FC<SimpleTableProps> = props => (
  <TableContainer sx={{ height: '100%' }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="caption"><strong>{props.header}</strong></Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="caption"><strong>Volume</strong></Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map(row => (
          <TableRow
            hover
            tabIndex={-1}
            key={row.keyword}
          >
            <TableCell>
              <Typography variant="caption">{row.keyword}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="caption">{abbreviateNumber(row.searchVolume)}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
