import s from './ListingField.module.css';

export interface ListingFieldProps {
  name: string;
  value: any;
}

export const ListingField = (field: ListingFieldProps) => {
  const { name, value } = field;
  return (
    <div className={s.root}>
      <span className={s.fieldName}>{name}</span>
      <span className={s.fieldValue}>{value} &#13217;</span>
    </div>
  );
};
