import s from './ListingList.module.css';
import { ListingProps } from '@app/components/models/Listing';
import { ListingCard } from '@app/components/models/ListingCard';

export interface ListingListProps {
  listings: ListingProps[];
}

export const ListingList = ({ listings }: ListingListProps) => {
  return (
    <div className={s.root}>
      {listings?.map((listing) => (
        <ListingCard key={`${listing.id}`} {...listing}></ListingCard>
      ))}
    </div>
  );
};
