import React from 'react';
import CartItem from '../components/CartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      uniqueCart: [],
    };
  }

  componentDidMount() {
    const localStorageItems = JSON.parse(localStorage.getItem('prods'));
    this.setState({ cart: localStorageItems }, () => {
      this.quantCounter();
    });
  }

    quantCounter = () => {
      const { cart } = this.state;
      const itemQuant = cart.reduce((accumulator, current) => {
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
      this.setState({
        uniqueCart: itemQuant,
      });
    };

    render() {
      const { cart, uniqueCart } = this.state;
      return (
        <div>
          {cart.length === 0 && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          {uniqueCart.map((item) => <CartItem key={ item.id } data={ item } />)}
        </div>
      );
    }
}

export default Cart;
