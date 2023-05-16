// import { Component } from 'react';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Container, StartText } from './App.styled';
import * as API from 'searchApi/SearchApi';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

const API_KEY = '34896738-a1699c1dbaaca5ea67d26887d';

export function App() {
  const [galleryItem, setGalleryItem] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalImgs, setTotalImgs] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      setStatus('pending');

      try {
        const res = await API.searchImgs(searchValue, API_KEY, page);
        if (res.totalHits === 0) {
          setStatus('rejected');
          return;
        }
        setGalleryItem(s => [...s, ...res.hits]);
        setTotalImgs(res.totalHits);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    };

    fetch();
  }, [searchValue, page]);

  const onSubmit = value => {
    if (value === '') {
      return;
    }
    if (value === searchValue) {
      return;
    }
    setTotalImgs(0);
    setGalleryItem([]);
    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevPage => prevPage + 1);
  };
  return (
    <Container>
      <GlobalStyle></GlobalStyle>
      <Searchbar onSubmit={onSubmit} />
      {status === 'idle' && <StartText>Please enter your request</StartText>}
      {status === 'rejected' && (
        <StartText>Sorry, no result at your request "{searchValue}"</StartText>
      )}
      <ImageGallery
        items={galleryItem}
        status={status}
        searchValue={searchValue}
      />
      {status === 'pending' && <Loader></Loader>}
      {galleryItem.length !== 0 &&
        totalImgs > 12 &&
        galleryItem.length % 2 === 0 && <Button onClick={onLoadMore}></Button>}
    </Container>
  );
}
