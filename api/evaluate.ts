import axios from 'axios';
import { Handler } from '@netlify/functions';
import { parseEvaluateResponse } from './responseModels/evaluateResponse';
import { processResponse } from './responseModels/apiResponse';

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
    key: SEMRUSH_API_KEY,
    type: 'phrase_this',
    phrase: body.keywords,
    export_columns: 'Ph,Nq,Cp,Co,Nr,Td',
    database: body.selectedRegion,
  };

  try {
    const response = await axios.get('https://api.semrush.com/', { params });

    return processResponse(parseEvaluateResponse, response.data);
  }
  catch (err) {
    if (!axios.isAxiosError(err)) {
      throw err;
    }

    return {
      statusCode: err.response?.status ?? 400,
      body: err.message,
    };
  }
};

type Body = Readonly<{
  keywords: string;
  selectedRegion: string;
}>;
