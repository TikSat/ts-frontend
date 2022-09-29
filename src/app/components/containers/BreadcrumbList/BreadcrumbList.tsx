import React from 'react';
import Head from 'next/head';
import SchemaGenerator from 'src/lib/schemaGenerator';
import { Breadcrumb, BreadcrumbProps } from '@app/components/models/Breadcrumb';
import s from './BreadcrumbList.module.css';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';

export interface BreadcrumbListProps {
  breadcrumbs: BreadcrumbProps[];
}

export const BreadcrumbList = ({ breadcrumbs }: BreadcrumbListProps) => {
  const { preferences } = useTypedSelectors((state) => state.preferences);
  const { location } = preferences;

  let list = breadcrumbs?.filter((el) => el.title != null || el.title != undefined);
  list[0].title = location;
  if (list.length === 1) {
    list = [];
  }

  const generator = new SchemaGenerator();
  return (
    <React.Fragment>
      {/*Injects breadcrumbs schema to head*/}
      <Head>
        <script
          key="breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generator.generateBreadcrumbsSchema(list) }}
        ></script>
      </Head>

      <ol className={s.root}>
        {list?.map((breadcrumb, index) => {
          return <Breadcrumb key={index} {...breadcrumb} />;
        })}
      </ol>
    </React.Fragment>
  );
};
