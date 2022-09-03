import s from '@app/components/models/Listing/Listing.module.css';
import Image from 'next/image';
import React from 'react';
import image from '/public/img_1.png';

export interface ListingImageProps {
  image_url?: string;
  alt?: string;
}

export const ListingImage = ({ image_url, alt }: ListingImageProps) => {
  const image_src = !!image_url ? image_url : image.src;

  return (
    <div className={s.image}>
      <Image src={image_src} layout={'fill'} alt={alt}></Image>
    </div>
  );
};
