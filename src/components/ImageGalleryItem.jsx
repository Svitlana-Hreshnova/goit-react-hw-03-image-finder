import { Component } from 'react';

class ImageGalleryItem extends Component {
  handleClick = () => {
    const { onClick, image } = this.props;
    if (typeof onClick === 'function') {
      onClick(image.largeImageURL);
    }
  };

  render() {
    const { webformatURL } = this.props.image;
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt=""
          onClick={this.handleClick}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
