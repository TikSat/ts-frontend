import React from 'react';
import { CategoryProps } from '@core/components/Category/Category';
import Head from 'next/head';
import SchemaGenerator from '@core/helpers/schemaGenerator';

export interface ListingProps {
  id: string;
  title: string;
  slug: string;
  category?: CategoryProps;
  url?: string;
}
// TODO: add schema.org Product markup json+ld

export const Listing = ({ id, slug, category, title }: ListingProps) => {
  const generator = new SchemaGenerator();
  return (
    <React.Fragment>
      <Head>
        <script
          key="product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generator.generateListingSchema({ id, slug, category, title }),
          }}
        ></script>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
    </React.Fragment>
  );
};
