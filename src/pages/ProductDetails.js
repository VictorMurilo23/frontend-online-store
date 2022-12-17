import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getByProductId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: {},
      cartProducts: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const cartProductsInLocalStorage = JSON.parse(localStorage.getItem('prods')) || [];
    const result = await getByProductId(id);
    this.setState({
      loading: false,
      product: result,
      cartProducts: [...cartProductsInLocalStorage],
    });
  }

  componentWillUnmount() {
    const { cartProducts } = this.state;
    localStorage.setItem('prods', JSON.stringify(cartProducts));
  }

  addProduct = () => {
    const { product } = this.state;
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
    }));
  }

  render() {
    const { loading, product } = this.state;
    return (
      <div>
        {loading ? (<h1> CARREGANDO...</h1>)
          : (
            <div className="product-details">
              <Link to="/cart" data-testid="shopping-cart-button">
                <img width="32px" src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="button" />
              </Link>
              <div className="details">
                <div className="product-info">
                  <h3 data-testid="product-detail-name">{product.title}</h3>
                  <p>
                    preço:
                    {product.price}
                  </p>
                </div>
                <div className="product-thumb">
                  <img src={ product.thumbnail } alt={ product.title } />
                </div>
              </div>
              <div className="product-details-button">
                <button
                  data-testid="product-detail-add-to-cart"
                  type="button"
                  onClick={ this.addProduct }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>

          )}

      </div>

    );
  }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
