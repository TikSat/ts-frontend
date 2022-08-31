import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';

export const buildBreadcrumbs = async (
  categoryId: string | string[] | undefined,
  listing = false
) => {
  let breadcrumbs = [];
  const slugs = await fetch(ApiRoutes({ categoryId: categoryId }).breadcrumbs);
  const data = slugs?.data;

  // add location first
  breadcrumbs.push({
    title: 'Istanbul',
    url: '/',
    current: false,
  });

  if (data) {
    const last = data[data.length - 1];
    data.forEach((crumb: 2[]) => {
      breadcrumbs.push({
        title: crumb[0],
        url: `/${crumb[1]}`,
        current: crumb == last && !listing,
      });
    });
  }

  return breadcrumbs;
};
