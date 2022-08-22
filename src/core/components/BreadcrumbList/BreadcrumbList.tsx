import { Breadcrumb, BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import React from 'react';
import s from './BreadcrumbList.module.css';
import Head from 'next/head';
import SchemaGenerator from '@core/helpers/schemaGenerator';

interface BreadcrumbListProps {
  breadcrumbs: BreadcrumbProps[];
}

export const BreadcrumbList = ({ breadcrumbs }: BreadcrumbListProps) => {
  const list = breadcrumbs.filter((el) => el.title != null);
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
        {list.map((breadcrumb, index) => {
          return <Breadcrumb key={index} {...breadcrumb} />;
        })}
      </ol>
    </React.Fragment>
  );
};
