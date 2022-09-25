import { ListingProps } from '@app/components/models/Listing';
import { ListingCard } from '@app/components/models/ListingCard';
import s from './ListingList.module.scss';

export interface ListingListProps {
  listings: ListingProps[];
  currentPage: number;
  totalPages: number;
  url: string;
  apiUrl: string;
}

export const ListingList = (listingsList: ListingListProps) => {
  const listings = listingsList.listings;
  return (
    <div className={s.root}>
      {listings?.map((listing) => (
        <ListingCard key={`${listing.id}`} {...listing}></ListingCard>
      ))}
    </div>
  );
};
