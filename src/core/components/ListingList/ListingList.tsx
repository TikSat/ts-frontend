import { ListingPreview } from '@core/components/ListingPreview';
import s from '@core/components/ListingList/ListingList.module.css';
import { ListingProps } from '@core/components/Listing/Listing';

export interface ListingListProps {
  listings: ListingProps[];
}

export const ListingList = ({ listings }: ListingListProps) => {
  return (
    <div className={s.root}>
      {listings?.map((listing) => (
        <ListingPreview key={`${listing.id}`} {...listing}></ListingPreview>
      ))}
    </div>
  );
};
