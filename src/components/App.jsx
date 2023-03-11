import { Component } from 'react';
import { getImages } from '../services/gallery-api';
import styles from "./app.module.css"
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export default class App extends Component {

  state = {
    searchQuery: "",
    page: 1,
    items: [],
    hitsQuantity: null,
    isProcessing: false,
    showModal: false,
    openImageURL: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.searchImages();
    }
  }

  async searchImages() {
    try {
      this.setState({ isProcessing: true });

      const { searchQuery, page } = this.state;

      const data = await getImages(searchQuery, page);
      if (data.hits && data.hits.length) {
        this.setState(({ items }) => ({ items: [...items, ...data.hits] }));
      } else {
        this.setState({ error: 'Images not found' })
      }
      this.setState({ hitsQuantity: data.totalHits });

    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isProcessing: false });
    }
  }

  onChangeSearchQuery = (searchQuery) => {
    this.setState({
      searchQuery,
      items: [],
      page: 1,
      error: null,
      hitsQuantity: null,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = (imageURL) => {
    this.setState({ showModal: true, openImageURL: imageURL });
  };


  closeModal = () => {
    this.setState({
      showModal: false,
      openImageURL: null,
    });
  };

  render() {
    const { items, isProcessing, error, showModal, openImageURL, hitsQuantity } =
      this.state;
    const { showImage, closeModal } = this;

    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: '#010101',
        backgroundColor: "rgb(231, 236, 242)",
      }}>
        <Searchbar onChangeSearchQuery={this.onChangeSearchQuery} />
        {error && <p className={styles.errorMessage}>{error}</p>}
        {items.length !== 0 && (
          <ImageGallery items={items} showImage={showImage} />
        )}
        {(hitsQuantity > items.length) && !isProcessing && (
          <Button title="Load more..." onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal close={closeModal}>
            <img src={openImageURL} alt="" />
          </Modal>
        )}
        <Loader visible={isProcessing} />
      </div>
    );
  }
}
