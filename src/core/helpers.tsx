import { serverUrl } from '@core/routes';

export const fetchApi = async (
  url: string,
  opts = {
    headers: {},
    method: '',
    token: '',
  }
) => {
  try {
    const res = await fetch(serverUrl + url, {
      method: opts?.method || 'GET',
      headers: {
        Authorization: `Bearer ${opts?.token || ''}`,
        'Cache-Control': 'public; max-age=3600',
        ...opts?.headers,
      },
    });
    return await res.json();
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
