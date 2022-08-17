export const fetchApi = async (url: string) => {
  try {
    const res = await fetch(url);

    const errCode = res.ok ? false : res.status;
    if (errCode) {
      return { notFound: true };
    }

    const data = await res.json();
    if (!data) {
      return { notFound: true };
    }

    return { props: { data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
