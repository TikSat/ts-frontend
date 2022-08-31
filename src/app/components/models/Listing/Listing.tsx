import React from 'react';
import Head from 'next/head';
import { CategoryProps } from '@app/components/models/Category';
import SchemaGenerator from 'src/lib/schemaGenerator';
import { ListingField, ListingFieldProps } from '@app/components/models/ListingField';
import { serverUrl } from 'src/lib/api/fetcher';
import image from '/public/img_1.png';
import s from './Listing.module.css';
import Image from 'next/image';
import { format } from 'src/lib/api/currencyFormatter';

export interface ListingProps {
  id: string;
  title: string;
  slug: string;
  category?: CategoryProps;
  url?: string;
  fields?: [];
  image_url?: string;
  price?: number;
}
// TODO: add schema.org Product markup json+ld
export const Listing = ({ id, slug, category, title, fields, price, image_url }: ListingProps) => {
  const image_src = !!image_url ? serverUrl + image_url : image.src;
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
      <h1 className={'h1'}>{title}</h1>
      <h2>{format('tr-TR', 'TRY', price || 0)}</h2>
      <div className={s.image}>
        <Image src={image_src} width={'300'} height={'200'} alt={title}></Image>
      </div>
      <div>
        {fields?.map((field: ListingFieldProps, index) => {
          return <ListingField key={index} {...field}></ListingField>;
        })}
      </div>
    </React.Fragment>
  );
};
