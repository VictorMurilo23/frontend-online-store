import React from 'react';
import PropTypes from 'prop-types';
import { getByProductId } from '../services/api';
import Header from '../components/Header';
import AvaliationForm from '../components/AvaliationForm';
import Avaliations from '../components/Avaliations';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: {},
      cartProducts: [],
      productAvaliations: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const cartProductsInLocalStorage = JSON.parse(localStorage.getItem('prods')) || [];
    const avaliations = this.getProductAvaliations(id);
    const result = await getByProductId(id);
    this.setState({
      product: result,
      cartProducts: [...cartProductsInLocalStorage],
      productAvaliations: avaliations,
      loading: false,
    });
  }

  componentWillUnmount() {
    const { cartProducts, productAvaliations } = this.state;
    const { match: { params: { id } } } = this.props;
    const allAvaliations = JSON.parse(localStorage.getItem('avaliations')) || {};
    localStorage
      .setItem('avaliations', JSON
        .stringify({ ...allAvaliations, [id]: productAvaliations }));
    localStorage.setItem('prods', JSON.stringify(cartProducts));
  }

  getProductAvaliations = (productId) => {
    const allAvaliations = JSON.parse(localStorage.getItem('avaliations')) || null;
    if (allAvaliations === null) {
      return [];
    }
    const productAvaliations = allAvaliations[productId] === undefined
      ? [] : allAvaliations[productId];

    return productAvaliations;
  }

  addProduct = () => {
    const { product } = this.state;
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
    }));
  }

  saveAvaliation = (avaliaton) => {
    this.setState((prevState) => ({
      productAvaliations: [...prevState.productAvaliations, avaliaton],
    }));
  }

  render() {
    const { loading, product, productAvaliations, cartProducts } = this.state;
    if (loading) {
      return (<h1 className="loading"> CARREGANDO...</h1>);
    }
    return (
      <div>
        <Header cartProducts={ cartProducts } />
        <div className="product-details">
          <div className="details">
            <div className="product-info">
              <h3 data-testid="product-detail-name">{product.title}</h3>
              <p>
                preço:
                {product.price}
              </p>
            </div>
            <div className="product-thumb">
              <img src={ product.pictures[0].url } alt={ product.title } />
            </div>
          </div>
          {
            product.shipping.free_shipping === true && (
              <div>
                <span data-testid="free-shipping">Frete Gratis</span>
              </div>
            )
          }
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
        <div>
          <h2>Avaliações</h2>
          <div>
            <AvaliationForm saveAvaliation={ this.saveAvaliation } />
          </div>
          <div>
            <Avaliations productAvaliations={ productAvaliations } />
          </div>
        </div>
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
