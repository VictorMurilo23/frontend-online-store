import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { quant } = props.data;
    this.state = {
      quantity: quant,
    };
  }

  increaseQuant = () => {
    const { data } = this.props;
    const { quantity } = this.state;
    if (quantity < data.available_quantity) {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
      }));
    }
  }

  decreaseQuant = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }));
    }
  }

  render() {
    const { data: { title, price, thumbnail } } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cartItem">
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>
          R$
          {' '}
          {
            (price * quantity).toFixed(2)
          }
        </p>
        <div className="item-quantity-container">
          <button
            type="button"
            className="quantity-button"
            data-testid="product-decrease-quantity"
            onClick={ this.decreaseQuant }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            className="quantity-button"
            onClick={ this.increaseQuant }
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    quant: PropTypes.number,
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default CartItem;
