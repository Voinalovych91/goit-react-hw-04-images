import React, { useState, useEffect, memo } from 'react';
import * as Scroll from 'react-scroll';
import { AppContainer, ErrorContainer } from './App.styled'; 
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import api from 'services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App () { 

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [bigImage, setBigImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);

    api.apiSearchQuery(query, page)
      .then(data => {
        if (data.totalHits === 0 || data.hits === '') {
          toast.error('Nothing.', { position: toast.POSITION.TOP_RIGHT });
          setStatus(Status.RESOLVED);
          setTotalHits(0);
          return;
        }

        setTotalHits(data.totalHits);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setStatus(Status.RESOLVED);
        })
      .catch (error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [query, page]);
   
  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };
  
  const toggleModal = largeImageURL => {
    setShowModal(prevShowModal => !prevShowModal);
    setBigImage(largeImageURL);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    const scroll = Scroll.animateScroll;
    scroll.scrollMore(650);
  };

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return (
      <ErrorContainer>
          {error}
      </ErrorContainer>
      );
  }

  if (status === Status.RESOLVED) { 

    return (
      <>
        <AppContainer>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} toggleModal={toggleModal} />
          {showModal && (
            <Modal onClickModal={toggleModal} image={bigImage} />
          )}
          {images.length !== totalHits && (
            <Button onClick={handleLoadMore} />
          )}
        </AppContainer>
        <ToastContainer autoClose={1000} theme={'colored'} />
      </>
    );
    }
  }


export default memo(App);