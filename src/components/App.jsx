import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { GetImages } from './services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { LoaderSpiner } from './Loader/Loader';
import { toast } from 'react-toastify';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: false,
    showModal: false,
    zoomImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchQuery;
    const currentSearch = this.state.searchQuery;
    if (prevSearch !== currentSearch && this.searchQuery !== '') {
      this.setState({ isLoading: true });

      try {
        const imagesResponse = await GetImages(currentSearch, this.state.page);
        const images = imagesResponse.data.hits;
        this.setState({ images: images });
        this.setState({ isLoading: false });
        this.setState(prevState => ({ page: prevState.page + 1 }));
        toast.success(`Мы нашли ${imagesResponse.data.totalHits} картинок.`, {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } catch (error) {
        console.log(error, `Попробуйте перезагрузить страницу`);
        toast.warn('Упс... Попробуйте перезагрузить страницу!', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        this.setState({ error });
      }
    }
  }
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.setState({ page: 1 });
  };
  onLoadMore = async () => {
    const currentSearch = this.state.searchQuery;
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ isLoading: true });
    const imagesResponse = await GetImages(currentSearch, this.state.page);
    const images = imagesResponse.data.hits;

    this.setState(prevState => ({
      images: [...prevState.images, ...images],
    }));
    this.setState({ isLoading: false });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setZoomImage = imageLink => {
    this.setState(({ zoomImage }) => ({ zoomImage: imageLink }));
    this.toggleModal();
  };

  render() {
    const { images, showModal, zoomImage, isLoading } = this.state;

    return (
      <>
        <Searchbar onImgsSeach={this.handleFormSubmit} />
        <ToastContainer
          transition={Flip}
          theme="dark"
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        {images && (
          <ImageGallery
            images={images}
            openModal={this.toggleModal}
            setZoomImage={this.setZoomImage}
          />
        )}
        {isLoading && <LoaderSpiner />}
        {images.length > 11 && <Button onLoadMore={this.onLoadMore} />}

        {showModal && <Modal whenClose={this.toggleModal} data={zoomImage} />}
      </>
    );
  }
}
export default App;
