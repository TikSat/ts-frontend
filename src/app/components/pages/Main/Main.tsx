import { FC, Fragment } from 'react';
import Head from 'next/head';
import { CategoryProps } from '@app/components/models/Category/Category';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { CategoryList } from '@app/components/containers/CategoryList';
import { ContainerWithSidebar } from '@app/components/containers/ContainerWithSidebar';
import { BreadcrumbList } from '@app/components/containers/BreadcrumbList';
import { ListingList, ListingListProps } from '@app/components/containers/ListingList';
import { Sidebar } from '@app/components/containers/Sidebar';
import { FavoritesListPreview } from '@app/components/containers/FavoritesListPreview';

export type MainPageProps = {
  categories: CategoryProps[];
  listingList: ListingListProps;
  breadcrumbs: BreadcrumbProps[];
  title: string;
  header: string;
  category?: CategoryProps;
};

export const Main: FC<MainPageProps> = ({
  categories,
  breadcrumbs,
  listingList,
  title = 'Istanbul',
  header = 'Your Recommendations',
  category,
}) => {
  const { user } = useTypedSelectors((state) => state.user);
  const pageTitle = `${title} | Tiksat`;
  return (
    <Fragment>
      {/*Injects to head*/}
      <Head>
        <title>{pageTitle}</title>
        {category && category.desc && <meta name={'description'} content={category?.desc} />}
      </Head>
      {categories.length > 0 && <CategoryList categories={categories}></CategoryList>}

      <ContainerWithSidebar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
          <h1 className={'h1'}>{header}</h1>
          <ListingList {...listingList}></ListingList>
        </div>
        <Sidebar>
          <FavoritesListPreview {...listingList}></FavoritesListPreview>
        </Sidebar>
      </ContainerWithSidebar>
    </Fragment>
  );
};
