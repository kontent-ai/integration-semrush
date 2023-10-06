import { Response } from '@netlify/functions/dist/function/response';

import { errorMessageMap } from './errorMessageMap';
import { isParseError, not, ParseResult } from './parseUtils';

export type ApiResponse<Result extends AnyReadonlyRecord> = Readonly<{
  schema: Schema<Result>;
  results: ReadonlyArray<Result>;
}>;

export const createParseResponse = <Result extends AnyReadonlyRecord>(parseResult: (str: string) => ParseResult<Result>, columnsOrder: ReadonlyArray<keyof Result>) => (str: string): ParseResult<ApiResponse<Result>> => {
  const [headerRow, ...restRows] = str.split('\r\n');

  const schema = parseSchema(headerRow, columnsOrder);
  const allResults = restRows.map(parseResult);

  const results = allResults.filter(not(isParseError));
  if (results.length !== allResults.length || isParseError(schema)) {
    return [schema, ...allResults].find(isParseError) || { type: 'error', error: 'Failed to parse.' };
  }

  return {
    type: 'success',
    result: {
      schema: schema.result,
      results: results.map(r => r.result),
    },
  };
}

const parseSchema = <T extends AnyReadonlyRecord>(str: string, columnsOrder: ReadonlyArray<keyof T>): ParseResult<Schema<T>> => {
  const columns = str.split(';');

  if (columns.length !== columnsOrder.length) {
    return { type: 'error', error: 'Incorrect number of columns.' };
  }

  return {
    type: 'success',
    result: Object.fromEntries(columnsOrder.map((columnKey, i) => [columnKey, columns[i]] as const)) as Schema<T>,
  };
};

type Schema<Result extends AnyReadonlyRecord> = Readonly<{ [Key in keyof Result]: string }>;

type AnyReadonlyRecord = Readonly<Record<string, unknown>>;

export const processResponse = (parseResponse: (str: string) => ParseResult<ApiResponse<any>>, rawResponse: string): Response => {
  if (errorMessageMap[rawResponse]) {
    return {
      statusCode: 400,
      body: errorMessageMap[rawResponse],
    };
  }

  const parsedResponse = parseResponse(rawResponse);
  if (parsedResponse.type === 'error') {
    return {
      statusCode: 500,
      body: parsedResponse.error,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(parsedResponse.result),
  };
};
