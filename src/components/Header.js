import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';
import CartIcon from './CartIcon';
import Cart from './Cart';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      showCart: false,
    };
  }

  handleShowCart = () => {
    this.setState((prevState) => ({
      showCart: !prevState.showCart,
    }));
  }

  render() {
    const { cartProducts, showSearchBar, handleInput, handleSearchButton } = this.props;
    const { showCart } = this.state;
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
        <div className="cart">
          <CartIcon cartItems={ cartProducts } handleShowCart={ this.handleShowCart } />
          {
            showCart === true && (
              <Cart />
            )
          }
        </div>
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
