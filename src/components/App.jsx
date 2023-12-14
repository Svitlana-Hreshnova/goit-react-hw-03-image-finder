import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import fetchImages from './Api';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    loadMore: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getPhotos();
    }
  }
  getPhotos = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        return alert('We dont found');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };
  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleCloseModal();
    }
  };

  handleClickOutside = event => {
    if (event.target.classList.contains('Overlay')) {
      this.handleCloseModal();
    }
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, loadMore } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && loadMore && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
