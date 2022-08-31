interface ApiProps {
  categoryId?: string | string[];
  listingId?: string | string[];
}

export const ApiRoutes = ({ categoryId, listingId }: ApiProps) => {
  return {
    categories: '/api/categories',
    categoriesIds: '/api/categories/ids',
    category: `/api/categories/${categoryId}`,
    subcategories: `/api/categories/${categoryId}/subcategories`,
    recommended: '/api/listings/recommended',
    profile: '/api/me',
    listings: `/api/categories/${categoryId}/listings`,
    listing: `/api/categories/${categoryId}/listings/${listingId}`,
    signIn: '/api/sign_in',
    signUp: '/api/sign_up',
    tokens: '/api/tokens',
    breadcrumbs: `/api/categories/${categoryId}/breadcrumbs`,
  };
};
