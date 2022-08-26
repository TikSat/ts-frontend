import { AdminRoutes } from '@app/admin-routes';
import { fetch } from 'src/lib/api/fetcher';
import { NavLink } from '@app/components/ui/NavLink';
import { useEffect, useState } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => setCategories(res));
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!categories) {
    return <p>No data</p>;
  }

  return (
    <>
      <h1>Categories</h1>
      <table className={'w-100'}>
        <tbody>
          {categories?.map(({ desc, id, name, slug }) => {
            return (
              <tr key={id}>
                <td>
                  <NavLink href={`/backend/categories/${id}`}>{name}</NavLink>
                </td>
                <td>{desc}</td>
                <td>{slug}</td>
                <td>
                  <NavLink href={'/backend'}>Edit</NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const getCategories = async () => {
  const categoriesData = await fetch(AdminRoutes({}).categories);
  return await categoriesData?.data;
};

CategoriesPage.setLayout = function setLayout() {
  return 'admin';
};

export default CategoriesPage;
