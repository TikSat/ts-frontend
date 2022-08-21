import { ParsedUrlQuery } from 'querystring';

export const serverUrl = process.env.SERVER_URL;

export const ApiRoutes = (data: ParsedUrlQuery | undefined) => {
  return {
    categories: '/api/categories?root=true',
    category: `/api/categories/${data?.categoryId}`,
    subcategories: `/api/categories/${data?.categoryId}/subcategories`,
    recommended: '/api/listings/recommended',
    profile: '/api/me',
    listings: `/api/categories/${data?.categoryId}/listings`,
    listing: `/api/categories/${data?.categoryId}/listings/${data?.listingId}`,
    signIn: '/api/sign_in',
    signUp: '/api/sign_up',
  };
};
