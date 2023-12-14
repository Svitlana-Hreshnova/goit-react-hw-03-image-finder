import { Component } from 'react';

class Modal extends Component {
  handleContentClick = event => {
    event.stopPropagation();
  };

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal" onClick={this.handleContentClick}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
