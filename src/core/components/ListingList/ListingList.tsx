import { ListingCardPreview } from '@core/components/ListingCardPreview';
import s from '@core/components/ListingList/ListingList.module.css';
import { ListingProps } from '@core/components/Listing/Listing';

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
