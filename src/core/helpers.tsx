import { serverUrl } from '@core/routes';
import axios from 'axios';

export const fetchApi = async (
  url: string,
  opts: {
    headers?: any;
    method?: string;
  } = {}
) => {
  try {
    const { headers, ...others } = opts;

    const res = await axios
      .request({
        url: url,
        baseURL: serverUrl,
        headers: {
          Accept: 'application/json',
          ...headers,
        },
        ...others,
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return error.response;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });

    if (res) return await res.data;
  } catch (error) {
    throw error;
  }
};
