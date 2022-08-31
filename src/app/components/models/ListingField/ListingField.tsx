export interface ListingFieldProps {
  name: string;
  value: any;
}

export const ListingField = (field: ListingFieldProps) => {
  const { name, value } = field;
  return (
    <div>
      {name} | {value}
    </div>
  );
};
