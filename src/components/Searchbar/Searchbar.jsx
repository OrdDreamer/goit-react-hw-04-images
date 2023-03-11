import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.css';

class Searchbar extends Component {

  state = {
    searchQuery: "",
  };

  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.searchQuery) {
      return;
    }
    this.props.onChangeSearchQuery(this.state.searchQuery);
    this.reset();
  }

  reset() {
    this.setState({
      searchQuery: "",
    });
  }

  render() {
    const { search } = this.state;
    const { handleSubmit } = this;

    return (
      <header className={styles.headerContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            value={search}
            type="text"
            autoComplete="off"
            placeholder="Search images"
            onChange={this.handleChange}
          />
          <button className={styles.searchButton} type="submit">Search</button>
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onChangeSearchQuery: PropTypes.func.isRequired,
};
