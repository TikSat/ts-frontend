import { Layout } from '@core/components/Layout';
import { ReactElement, ReactNode } from 'react';

const Backend = () => {
  return <div></div>;
};

function AdminLayout(props: { children: ReactNode }) {
  return <div>{props.children}</div>;
}

Backend.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Backend;
