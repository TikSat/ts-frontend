import { ParsedUrlQuery } from 'querystring';

export const serverUrl = process.env.SERVER_URL;

export const ApiRoutes = (data: ParsedUrlQuery | undefined) => {
  return {
    categories: '/api/categories?root=true',
    recommended: '/api/listings/recommended',
    profile: '/api/me',
    listings: `/api/categories/${data?.categoryId}/listings`,
    listing: `/api/categories/${data?.categoryId}/listings/${data?.listingId}`,
  };
};
