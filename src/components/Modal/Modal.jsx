import React from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalModal, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends React.Component {
  static propTypes = {
    whenClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log(`Escape нажали`);
      this.props.whenClose();
    }
  };
  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.whenClose();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.data;
    return createPortal(
      <ModalOverlay onClick={this.handleBackDropClick}>
        <ModalModal>
          <ModalImg src={largeImageURL} alt={tags} />
        </ModalModal>
      </ModalOverlay>,
      modalRoot
    );
  }
}
