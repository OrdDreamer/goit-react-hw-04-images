import { useEffect, useState } from 'react';
import { getImages } from '../services/gallery-api';
import styles from './app.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hitsQuantity, setHitsQuantity] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openImageURL, setOpenImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      const searchImages = async () => {
        try {
          setIsProcessing(true);
          const data = await getImages(searchQuery, page);

          if (data.hits && data.hits.length) {
            setItems((prevItems) => [...prevItems, ...data.hits]);
          } else {
            setError('Images not found');
          }

          setHitsQuantity(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsProcessing(false);
        }
      };
      searchImages();
    }
  }, [searchQuery, page]);

  const onChangeSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
    setItems([]);
    setHitsQuantity(null);
    setPage(1);
    setError(null);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showImage = (imageURL) => {
    setShowModal(true);
    setOpenImageURL(imageURL);
  };


  const closeModal = () => {
    setShowModal(false);
    setOpenImageURL(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#010101',
      backgroundColor: 'rgb(231, 236, 242)',
    }}>
      <Searchbar onChangeSearchQuery={onChangeSearchQuery} />
      {error && <p className={styles.errorMessage}>{error}</p>}
      {items.length !== 0 && (
        <ImageGallery items={items} showImage={showImage} />
      )}
      {(hitsQuantity > items.length) && !isProcessing && (
        <Button title='Load more...' onClick={loadMore} />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <img src={openImageURL} alt='' />
        </Modal>
      )}
      <Loader visible={isProcessing} />
    </div>
  );
};
