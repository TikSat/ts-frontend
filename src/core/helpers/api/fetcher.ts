import axios from 'axios';
const serverUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchApi = async (
  url: string,
  opts: {
    headers?: any;
    method?: string;
    token?: string | null;
  } = {}
) => {
  try {
    let { headers, token, ...others } = opts;

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

    return await res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
