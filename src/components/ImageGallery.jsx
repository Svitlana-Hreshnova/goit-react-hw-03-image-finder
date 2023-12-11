import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={this.props.onClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
