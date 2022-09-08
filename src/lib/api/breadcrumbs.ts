import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';

export const buildBreadcrumbs = async ({
  categoryId = null,
  listing = false,
}: {
  categoryId?: string | string[] | undefined | null;
  listing?: boolean;
}): Promise<any> => {
  let breadcrumbs = [];
  const slugs = await fetch(ApiRoutes({ categoryId }).breadcrumbs);

  // add location first
  breadcrumbs.push({
    title: 'Istanbul',
    url: '/',
    current: false,
  });

  if (slugs?.status == 200 && slugs?.data) {
    const data = slugs?.data;
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
