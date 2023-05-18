import React from 'react';
import { GallaryContainer } from './ImageGallery.styled'; 
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';


function ImageGallery({images, toggleModal}) {
  return (
    <GallaryContainer>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClickItem={() => {
            toggleModal(largeImageURL);
          }}
        />
      ))}
    </GallaryContainer>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })).isRequired,
  onClickItem: PropTypes.func,
};