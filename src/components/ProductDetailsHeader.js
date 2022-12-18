import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';
import CartIcon from './CartIcon';

export default class ProductDetailsHeader extends Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <div className="nav-div">
        <div>
          <Link to="/">
            <img className="logo" src={ logoProjeto } alt="logo" />
          </Link>
        </div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <CartIcon cartItems={ cartProducts } />
        </Link>
      </div>
    );
  }
}

ProductDetailsHeader.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
