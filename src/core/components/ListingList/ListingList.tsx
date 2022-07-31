import s from '@core/components/ListingList/ListingList.module.css';
import { ListingPreview } from '@core/components/ListingPreview';
import { ListingType } from '@core/components/ListingPreview/ListingPreview';

export type ListingListType = {
  listings: ListingType[];
};
export const ListingList = ({ listings }: ListingListType) => {
  return (
    <div className={s.root}>
      {listings?.map((listing) => (
        <ListingPreview key={`${listing.id}`} {...listing}></ListingPreview>
      ))}
    </div>
  );
};
