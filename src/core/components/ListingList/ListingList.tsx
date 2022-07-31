import s from '@core/components/ListingList/ListingList.module.css';
import { ListingPreview } from '@core/components/ListingPreview';
import { ListingType } from '@core/components/ListingPreview/ListingPreview';

export type ListingListType = {
  data: ListingType[];
};
export const ListingList = ({ data }: ListingListType) => {
  return (
    <div className={s.root}>
      {data?.map((listing) => (
        <ListingPreview key={`${listing.id}`} {...listing}></ListingPreview>
      ))}
    </div>
  );
};
