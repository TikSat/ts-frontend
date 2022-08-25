import { ListingCardPreview } from '@core/components/ListingCardPreview';
import { ListingProps } from '@core/components/Listing/Listing';
import s from './ListingList.module.css';

export interface ListingListProps {
  listings: ListingProps[];
}

export const ListingList = ({ listings }: ListingListProps) => {
  return (
    <div className={s.root}>
      {listings?.map((listing) => (
        <ListingCardPreview key={`${listing.id}`} {...listing}></ListingCardPreview>
      ))}
    </div>
  );
};
