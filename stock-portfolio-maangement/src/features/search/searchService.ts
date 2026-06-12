import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;
export const searchStocks = async (keyword: string) => {
  const response = await axios.get(
    `https://api.twelvedata.com/symbol_search`,
    {
      params: {
        symbol: keyword,
        apikey: API_KEY,
        q: keyword
      }
    }
  );
  return response.data;
};