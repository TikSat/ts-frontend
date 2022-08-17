import { serverUrl } from '@core/routes';

export const fetchApi = async (url: string) => {
  try {
    const res = await fetch(serverUrl + url);
    return await res.json();
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
