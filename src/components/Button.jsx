import { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="Button" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
