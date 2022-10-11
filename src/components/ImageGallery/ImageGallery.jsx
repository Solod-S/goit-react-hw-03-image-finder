import React from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
export const ImageGallery = ({ images, setZoomImage }) => {

  return (
    <ImageGalleryList>
      {images.map((image, indx) => (
        <ImageGalleryItem
          key={image.id}
          data={image}
          setZoomImage={setZoomImage}
          indx={indx}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  setZoomImage: PropTypes.func.isRequired,
};