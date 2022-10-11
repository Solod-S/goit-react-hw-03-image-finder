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
  data: 
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ,
  setZoomImage: PropTypes.func.isRequired,
};
