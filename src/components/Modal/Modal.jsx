import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { useCallback, useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ close, children }) => {

  const unplugModal = useCallback(({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener('keydown', unplugModal);
    return () => {
      document.removeEventListener('keydown', unplugModal);
    };
  }, [unplugModal]);

  return createPortal(
    <div className={styles.overlay} onClick={unplugModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
