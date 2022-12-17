import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';

export default class ProductDetailsHeader extends Component {
  render() {
    return (
      <div className="nav-div">
        <div>
          <Link to="/">
            <img className="logo" src={ logoProjeto } alt="logo" />
          </Link>
        </div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img width="32px" src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="button" />
        </Link>
      </div>
    );
  }
}
