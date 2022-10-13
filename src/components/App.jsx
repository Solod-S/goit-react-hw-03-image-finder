import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { GetImages } from './services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { LoaderSpiner } from './Loader/Loader';
import { ScrollChevron } from './ScrollChevron/ScrollChevron';
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
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    if (prevSearch !== currentSearch || prevPage !== currentPage) {
      this.setState({ isLoading: true });

      try {
        const imagesResponse = await GetImages(currentSearch, this.state.page);
        const images = imagesResponse.data.hits;
        const preparedImgs = images.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(({ images }) => ({
          images: [...images, ...preparedImgs],
        }));
        this.setState({ isLoading: false });

        toast.success(
          `Всего было найдено ${imagesResponse.data.totalHits} картинок.`,
          {
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }
        );
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
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ images: [] });
    }

    this.setState({ searchQuery });
    this.setState({ page: 1 });
  };
  onLoadMore = async () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setZoomImage = imageLink => {
    this.setState(({ zoomImage }) => ({ zoomImage: imageLink }));
    this.toggleModal();
  };
  changeZoomImage = value => {
    this.setState(prevState => ({ zoomImage: prevState.zoomImage + value }));
  };
  render() {
    const { images, showModal, zoomImage, isLoading } = this.state;

    return (
      <div id="up">
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
        {images.length && (
          <ImageGallery
            images={images}
            openModal={this.toggleModal}
            setZoomImage={this.setZoomImage}
          />
        )}
        {isLoading && <LoaderSpiner />}
        {images.length > 11 && <Button onLoadMore={this.onLoadMore} />}
        {images.length > 11 && <ScrollChevron />}
        {showModal && (
          <Modal
            whenClose={this.toggleModal}
            data={this.state.images}
            indx={zoomImage}
            changeZoomImage={this.changeZoomImage}
          />
        )}
      </div>
    );
  }
}
export default App;
