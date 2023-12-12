import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;

    return (
      <ul className="ImageGallery">
        {images.map((image, index) => (
          <ImageGalleryItem key={index} image={image} onClick={onClick} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
