import { ListingListType } from '@core/components/ListingList/ListingList';

export type ListingType = {
  title: string;
};

export const Listing = (listing: ListingType) => {
  return (
    <>
      <h1>{listing.title}</h1>
    </>
  );
};
