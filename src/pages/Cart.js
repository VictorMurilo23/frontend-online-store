import React from 'react';
import CartItem from '../components/CartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const localStorageItems = JSON.parse(localStorage.getItem('prods'));
    this.setState({ cart: localStorageItems });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {cart.map((item) => <CartItem key={ item.id } data={ item } />)}
      </div>
    );
  }
}

export default Cart;
