import PropTypes from 'prop-types';
import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, showImage }) => {
  return (
    <li
      className={styles.item}
      onClick={() => showImage(largeImageURL)}
    >
      <img src={webformatURL} alt="" className={styles.itemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
