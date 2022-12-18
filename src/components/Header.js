import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';
import CartIcon from './CartIcon';

export default class Header extends Component {
  render() {
    const { cartProducts, showSearchBar, handleInput, handleSearchButton } = this.props;
    return (
      <div className="nav-div">
        <div>
          <Link to="/">
            <img className="logo" src={ logoProjeto } alt="logo" />
          </Link>
        </div>
        {
          showSearchBar === true && (
            <div className="search-div">
              <input
                placeholder="Pesquisar"
                onChange={ handleInput }
                data-testid="query-input"
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ handleSearchButton }
              >
                P
              </button>
            </div>
          )
        }
        <Link to="/cart" data-testid="shopping-cart-button">
          <CartIcon cartItems={ cartProducts } />
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showSearchBar: PropTypes.bool,
  handleInput: PropTypes.func,
  handleSearchButton: PropTypes.func,
};

Header.defaultProps = {
  showSearchBar: false,
  handleInput: () => { console.log('Rapaaaaaaaiiiiiiz'); },
  handleSearchButton: () => { console.log('   '); },
};
