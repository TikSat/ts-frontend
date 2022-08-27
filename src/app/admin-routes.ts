interface ApiProps {
  categoryId?: string | string[];
  listingId?: string | string[];
}

export const AdminRoutes = ({ categoryId }: ApiProps) => {
  return {
    categories: '/api/admin/categories',
    category: `/api/admin/categories/${categoryId}`,
    signIn: '/api/sign_in',
    signUp: '/api/sign_up',
  };
};
