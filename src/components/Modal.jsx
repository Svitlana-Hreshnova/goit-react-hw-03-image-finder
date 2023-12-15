import { Component } from 'react';

class Modal extends Component {
  handleContentClick = event => {
    event.stopPropagation();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
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
