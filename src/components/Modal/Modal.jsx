import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalOverlay,
  ModalModal,
  ModalImg,
  ShowPrevImg,
  ShowNextImg,
} from './Modal.styled';
import { createPortal } from 'react-dom';
import { object } from 'yup';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends React.Component {
  static propTypes = {
    whenClose: PropTypes.func.isRequired,
    changeZoomImage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(object).isRequired,
    indx: PropTypes.number.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keydown', this.scrollImgByKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keydown', this.scrollImgByKeyDown);
  }
  scrollImgByKeyDown = event => {
    if (
      event.code === 'ArrowRight' &&
      this.props.indx + 1 !== this.props.data.length
    ) {
      this.props.changeZoomImage(+1);
    }
    if (event.code === 'ArrowLeft' && this.props.indx !== 0) {
      this.props.changeZoomImage(-1);
    }
  };
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
    const { indx, data, changeZoomImage } = this.props;
    const { largeImageURL, tags } = data[indx];
    return createPortal(
      <ModalOverlay onClick={this.handleBackDropClick}>
        {indx !== 0 && (
          <ShowPrevImg
            size={55}
            fill="#fff"
            onClick={() => changeZoomImage(-1)}
          />
        )}
        <ModalModal>
          <ModalImg src={largeImageURL} alt={tags} />
        </ModalModal>
        {indx + 1 !== data.length && (
          <ShowNextImg
            size={55}
            fill="#fff"
            onClick={() => changeZoomImage(+1)}
          />
        )}
      </ModalOverlay>,
      modalRoot
    );
  }
}
