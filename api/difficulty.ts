import { Handler } from '@netlify/functions';
import axios, { isAxiosError } from 'axios';

import { processResponse } from './responseModels/apiResponse';
import { parseDifficultyResponse } from './responseModels/difficultyResponse';

const { SEMRUSH_API_KEY } = process.env;

export const handler: Handler = async event => {
  const body: Body = JSON.parse(event.body ?? '');

  if (!SEMRUSH_API_KEY) {
    return {
      statusCode: 500,
      body: 'Missing api key. Please check the documentation and re-configure the server.',
    };
  }

  const params = {
    type: 'phrase_kdi',
    key: SEMRUSH_API_KEY,
    phrase: body.keyword,
    database: body.selectedRegion,
    export_columns: 'Kd',
  };

  try {
    const response = await axios.get('https://api.semrush.com', { params });

    return processResponse(parseDifficultyResponse, response.data);
  }
  catch (err) {
    if (!isAxiosError(err)) {
      throw err;
    }

    return {
      statusCode: err.response?.status ?? 400,
      body: err.message,
    };
  }
};

type Body = Readonly<{
  keyword: string;
  selectedRegion: string;
}>;
