import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.style';
export const ImageGalleryItem = ({ data, setZoomImage }) => {
  return (
    <ImageGalleryItemLi
      className="gallery-item"
      onClick={() => setZoomImage(data)}
    >
      <ImageGalleryItemImg src={data.webformatURL} alt={data.tags} />
    </ImageGalleryItemLi>
  );
};
ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
  setZoomImage: PropTypes.func.isRequired,
};
