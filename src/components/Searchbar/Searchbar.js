import { Field, Formik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  SerchButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }, resetForm) => {
  const handleSubmit = e => {
    onSubmit(e.searchValue);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ searchValue: '' }} onSubmit={handleSubmit}>
        {/* {({ isSubmitting }) => ( */}
        <Form autoComplete="off">
          <SerchButton type="submit">
            <SearchFormButtonLabel>
              <AiOutlineSearch />
            </SearchFormButtonLabel>
          </SerchButton>
          <Field
            className="SearchForm-input"
            name="searchValue"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
        {/* )} */}
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
