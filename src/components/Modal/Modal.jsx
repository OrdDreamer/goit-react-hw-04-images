import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.unplugModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.unplugModal);
  }

  unplugModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.unplugModal}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
