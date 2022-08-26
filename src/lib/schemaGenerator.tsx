import { BreadcrumbProps } from 'app/components/Breadcrumb/Breadcrumb';
import { ListingProps } from 'app/components/Listing/Listing';
const DOMAIN = 'https://tiksat.bid';

class SchemaGenerator {
  generateBreadcrumbsSchema = (breadcrumbs: BreadcrumbProps[]) => {
    const items = breadcrumbs?.map((breadcrumb, index) => {
      return {
        '@type': 'ListItem',
        position: index,
        name: breadcrumb.title,
        item: DOMAIN + breadcrumb.url,
      };
    });
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    });
  };

  generateListingSchema = (listing: ListingProps) => {
    const data = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: listing.title,
      image: 'https://www.example.com/anvil_executive.jpg',
      description:
        "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      mpn: '925872',
      brand: {
        '@type': 'Thing',
        name: 'ACME',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.4',
        reviewCount: '89',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '119.99',
        priceValidUntil: '2020-11-05',
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Executive Objects',
        },
      },
    };

    return JSON.stringify(data);
  };
}

export default SchemaGenerator;
