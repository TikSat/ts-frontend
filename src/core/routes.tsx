export const serverUrl = process.env.SERVER_URL;

interface ApiProps {
  categoryId?: string | string[];
  listingId?: string | string[];
}

export const ApiRoutes = ({ categoryId, listingId }: ApiProps) => {
  return {
    categories: '/api/categories?root=true',
    category: `/api/categories/${categoryId}`,
    subcategories: `/api/categories/${categoryId}/subcategories`,
    recommended: '/api/listings/recommended',
    profile: '/api/me',
    listings: `/api/categories/${categoryId}/listings`,
    listing: `/api/categories/${categoryId}/listings/${listingId}`,
    signIn: '/api/sign_in',
    signUp: '/api/sign_up',
  };
};
