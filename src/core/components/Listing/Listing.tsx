export type ListingType = {
  title: string;
};

export const Listing = ({ data }: ListingType) => {
  return (
    <>
      <h1>{data.title}</h1>
    </>
  );
};
