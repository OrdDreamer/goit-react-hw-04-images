import PropTypes from 'prop-types';
import styles from './image-gallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showImage }) => {
  return (
    <ul className={styles.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          showImage={showImage}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })).isRequired,
  showImage: PropTypes.func.isRequired,
};
