import { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalImg } from 'components/ModalImg/ModalImg';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
}) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div>
      <Item>
        <Image
          src={webformatURL}
          alt={tags}
          onClick={() => setSelectedImg(largeImageURL)}
        />
      </Item>
      <ModalImg
        isOpen={selectedImg !== null}
        onClose={() => setSelectedImg(null)}
        image={selectedImg}
        alt={tags}
      />
    </div>
  );
};
ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
