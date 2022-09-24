import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { ListingProps } from '@app/components/models/Listing';

export const buildBreadcrumbs = async ({
  categoryId = null,
  listing,
}: {
  categoryId?: string | string[] | undefined | null;
  listing?: ListingProps;
}): Promise<any> => {
  let breadcrumbs = [];
  const slugs = categoryId ? await fetch(ApiRoutes({ categoryId }).breadcrumbs) : null;

  // add location first
  breadcrumbs.push({
    title: 'Istanbul',
    url: '/',
    current: false,
  });

  if (slugs?.status == 200 && slugs?.data) {
    const data = slugs?.data;
    data.forEach((crumb: 2[]) => {
      breadcrumbs.push({
        title: crumb[0],
        url: `/${crumb[1]}`,
        current: false,
      });
    });
  }

  if (listing) {
    breadcrumbs.push({
      title: listing?.title,
      url: '/',
      current: false,
    });
  }

  breadcrumbs[breadcrumbs.length - 1].current = true;

  return breadcrumbs;
};
