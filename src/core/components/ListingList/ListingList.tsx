import { ListingPreview } from '@core/components/ListingPreview';
import { ListingProps } from '@core/components/ListingPreview/ListingPreview';
import s from '@core/components/ListingList/ListingList.module.css';

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
