import React, { FC } from 'react';
import Head from 'next/head';
import { CategoryProps } from '@app/components/models/Category';
import SchemaGenerator from 'src/lib/schemaGenerator';
import { ListingField, ListingFieldProps } from '@app/components/models/ListingField';
import { serverUrl } from 'src/lib/api/fetcher';
import Image from 'next/image';
import { format } from 'src/lib/api/currencyFormatter';
import { ListingImage } from '@app/components/models/ListingImage';
import image from '/public/img_1.png';
import s from './Listing.module.css';
import { BreadcrumbList } from '@app/components/containers/BreadcrumbList';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { Button } from '@app/components/ui/Button';
import cn from 'classnames';
import { Icon } from '@app/components/ui/Icon';

interface ListingComponentProps {
  breadcrumbs: BreadcrumbProps[];
  listing: ListingProps;
}

export interface ListingProps {
  id: string;
  title: string;
  slug: string;
  category?: CategoryProps;
  url?: string;
  fields?: [];
  image_url?: string;
  price?: number;
  images?: { id: string; image_url: string }[];
  created_at?: string;
  updated_at?: string;
  author?: {
    full_name: string;
  };
}
// TODO: add schema.org Product markup json+ld
export const Listing: FC<ListingComponentProps> = ({ breadcrumbs, listing }) => {
  const { id, image_url, title, slug, category, images, price, fields, author, updated_at } =
    listing;
  const image_src = !!image_url ? serverUrl + image_url : image.src;
  const generator = new SchemaGenerator();

  let options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  // @ts-ignore
  const listingDate = new Date(updated_at).toLocaleTimeString('tr-tr', options);

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
      <div className={s.root}>
        <div className={s.images}>
          <div className={s.image}>
            <Image src={image_src} layout={'fill'} alt={title}></Image>
          </div>
          {images?.map((image) => {
            const props = { alt: title, ...image };
            return <ListingImage key={image.id} {...props}></ListingImage>;
          })}
        </div>
        <div className={s.info}>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
          <h1 className={'h1'}>{title}</h1>
          <span className={'muted'}>
            Turkey, Istanbul, Rami Yeni, Yalnızcık Sk. 11-1, 34055 Eyüpsultan
          </span>
          <div className={s.cta}>
            <div className={s.left}>
              <span className={s.price}>{format('tr-TR', 'TRY', price || 0)}</span>
              <span className={'muted'}>65 217 ₺/m²</span>
            </div>
            <div className={s.right}>
              <div className={s.buttons}>
                <Button size={'md'}>Call seller</Button>
                <Button size={'md'} theme={'secondary'}>
                  Send message
                </Button>
              </div>
              <div className={s.profileInfo}>
                <span className={s.profileName}>
                  <span className={s.name}>
                    <span>{author?.full_name}</span>
                    {/*<span className={cn(s.role, 'muted')}> (owner)</span>*/}
                  </span>
                </span>
                <span className={s.profileRating}>
                  <span className={s.stars}>
                    <Icon name={'star'} theme={'star'} size={'xs'} />
                    <Icon name={'star'} theme={'star'} size={'xs'} />
                    <Icon name={'star'} theme={'star'} size={'xs'} />
                    <Icon name={'star'} theme={'star'} size={'xs'} />
                    <Icon name={'star'} theme={'star'} size={'xs'} />
                  </span>
                  <span className={s.reviews}>
                    <span className={s.totalRating}>5.0</span>
                    <span className={'muted'}> (106 reviews)</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={s.subInfo}>
            <span className={s.date}>
              <Icon size={'xs'} name={'calendar'} theme={'muted'} />
              {listingDate}
            </span>
          </div>
          <div className={s.main}>
            <h3>Main information</h3>
            <div className={s.fields}>
              {fields?.map((field: ListingFieldProps, index) => {
                return <ListingField key={index} {...field}></ListingField>;
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
