import React, { memo, useState } from 'react';
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled'; 
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Searchbar({onSubmit}) { 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const onChangeInput = (e) => {
    const value = e.currentTarget.value.toLowerCase();

    setQuery(value);
  };

  const resetForm = () => {
    setQuery('');
    setPage(1);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your request.', {
        position: toast.POSITION.TOP_RIGHT
      });

      return;
    };

    onSubmit(query, page);
    resetForm();
  };

  return (
    <div>
      <SearchbarContainer>
          <SearchForm onSubmit={onSubmitForm}>
              <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
              </SearchFormButton>

              <SearchFormInput
                  type="text"
                  name="query"
                  value={query}
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  onChange={onChangeInput}
              />
          </SearchForm>
      </SearchbarContainer> 
      <ToastContainer autoClose={1000} theme={'colored'} />
    </div>
  );
  
}

export default memo(Searchbar);

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};




