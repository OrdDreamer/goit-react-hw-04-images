import PropTypes from 'prop-types';
import styles from './searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onChangeSearchQuery}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery) {
      return;
    }
    onChangeSearchQuery(searchQuery);
    reset();
  }

  const reset = () => {
    setSearchQuery("");
  }

    return (
      <header className={styles.headerContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            value={searchQuery}
            type="text"
            autoComplete="off"
            placeholder="Search images"
            onChange={handleChange}
          />
          <button className={styles.searchButton} type="submit">Search</button>
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onChangeSearchQuery: PropTypes.func.isRequired,
};
