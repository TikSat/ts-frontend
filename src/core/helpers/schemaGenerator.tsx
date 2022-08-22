import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { serverUrl } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';

class SchemaGenerator {
  generateBreadcrumbsSchema = (breadcrumbs: BreadcrumbProps[]) => {
    const items = breadcrumbs
      .filter((el) => el.title != null)
      .map((breadcrumb, index) => {
        return {
          '@type': 'ListItem',
          position: index,
          name: breadcrumb.title,
          item: serverUrl + breadcrumb.url,
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
      image: 'http://www.example.com/anvil_executive.jpg',
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
        itemCondition: 'http://schema.org/UsedCondition',
        availability: 'http://schema.org/InStock',
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
