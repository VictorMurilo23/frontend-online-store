import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartIcon extends Component {
  cartQuantItems = () => {
    const { cartItems } = this.props;
    if (cartItems.length === 0) {
      return 0;
    }
    const itemQuant = cartItems.reduce((accumulator, current) => {
      const auxiliar = accumulator.find((element) => element.id === current.id);
      if (auxiliar === undefined) {
        current.quant = 1;
        accumulator.push(current);
      } else {
        const elementFound = accumulator.map((element) => element.id)
          .indexOf(current.id);
        accumulator[elementFound].quant += 1;
      }
      return accumulator;
    }, []);
    const quantNumber = itemQuant
      .map((element) => element.quant)
      .reduce((acc, cur) => acc + cur);
    return quantNumber;
  };

  render() {
    return (
      <div className="teste">
        <img width="32px" src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="button" />
        <p data-testid="shopping-cart-size">{ this.cartQuantItems() }</p>
      </div>
    );
  }
}

CartIcon.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
