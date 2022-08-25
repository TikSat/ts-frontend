import axios, { AxiosRequestConfig } from 'axios';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;
// @ts-ignore
import Qs from 'qs';

type FetcherConfig = AxiosRequestConfig & { token?: string | null };

export const fetch = async (url: string, config: FetcherConfig = {}) => {
  //TODO: remove it after debug
  console.log(serverUrl, process.env.NEXT_PUBLIC_SERVER_URL, process.env.SERVER_URL);
  try {
    config.paramsSerializer = function (params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };

    let { headers, token, ...others } = config;

    if (token) {
      headers = { Authorization: `Bearer ${token}`, ...headers };
    }

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
          return error.response.data;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return;
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(error);
        }
      });

    if (res) {
      return await res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
