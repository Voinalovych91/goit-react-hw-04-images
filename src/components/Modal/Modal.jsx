import React, { memo, useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled'; 
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ image, onClickModal }) {
  
  
  
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code !== 'Escape') {
        return;
      };
      onClickModal();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [onClickModal]);

  
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClickModal();
    }
  };

  
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={image} alt={image.tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
  
}

export default memo(Modal);

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};