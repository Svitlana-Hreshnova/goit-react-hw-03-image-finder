import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
// import fetchImages from './Api';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    loadMore: true,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.page !== prevState.page ||
  //     this.state.query !== prevState.query
  //   ) {
  //     this.fetchImages();
  //   }
  // }

  // fetchImages = () => {
  //   const { page, query } = this.state;

  //   this.setState({ isLoading: true });

  //   fetchImages(page, query)
  //     .then(data =>
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...data.images],
  //         page: data.nextPage,
  //         loadMore: data.hasMore,
  //       }))
  //     )
  //     .catch(error => console.error('Error fetching images:', error))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

  fetchImages = () => {
    const { page, query } = this.state;
    const apiKey = '40298326-3542dba9bdb0915da3eae5d6c';
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          loadMore: prevState.page < Math.ceil(data.totalHits / 12),
        }))
      )
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  handleLoadMoreClick = () => {
    this.fetchImages();
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
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
