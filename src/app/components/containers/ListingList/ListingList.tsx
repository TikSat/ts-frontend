import { ListingProps } from '@app/components/models/Listing';
import { ListingCard } from '@app/components/models/ListingCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetch } from 'src/lib/api/fetcher';
import useSWRInfinite from 'swr/infinite';
import s from './ListingList.module.scss';

export interface ListingListProps {
  listings: ListingProps[];
  currentPage: number;
  totalPages: number;
  url: string;
  apiUrl: string;
}

export const ListingList = (listingsList: ListingListProps) => {
  const { totalPages } = listingsList;

  const fetcher = (url: string) =>
    fetch(url, {
      params: {
        response: { include: ['id', 'title', 'price', 'slug', 'image_medium', 'category'] },
      },
    }).then((response) => response?.data);
  const getKey = (index: number) => {
    if (index == totalPages) return null;
    return `${listingsList.apiUrl}?page=${index + 1}`;
  };
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const listings = listingsList.listings.concat(...(data || []));
  const fetchListings = async () => {
    await setSize(size + 1);
  };

  return (
    <div className={s.root}>
      <InfiniteScroll
        dataLength={listings.length}
        next={fetchListings}
        hasMore={true}
        loader={null}
      >
        {listings?.map((listing) => (
          <ListingCard key={`${listing.id}`} {...listing}></ListingCard>
        ))}
      </InfiniteScroll>
    </div>
  );
};
