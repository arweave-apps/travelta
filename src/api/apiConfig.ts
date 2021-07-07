const SITE_URL = 'https://tequila-api.kiwi.com';

export const locationsConfig = {
  url: `${SITE_URL}/locations`,
  apikey: process.env.API_KEY,
};

export const searchTicketsConfig = {
  url: `${SITE_URL}/v2/search`,
  apikey: process.env.API_KEY,
};

export const searchMultiTicketsConfig = {
  url: `${SITE_URL}/v2/flights_multi`,
  apikey: process.env.MULTI_SEARCH_API_KEY,
};

export const airlinesConfig = {
  url: 'https://api.skypicker.com/carriers',
};
