import React from 'react';
import PropTypes from 'prop-types';
import { getByProductId } from '../services/api';

/*

 Ao clicar "no card" de um produto, a pessoa usuária deve ser direcionada para uma página contendo o nome, uma imagem, o preço e a especificação técnica desse produto. Além disso, essa página deve ter um botão que, ao clicar, a pessoa usuária deve ser redirecionada para a página do carrinho de compras.

-> Adicione o atributo data-testid="product-detail-link" no elemento que, ao ser clicado, enviará a pessoa usuária para a página de detalhes do produto. Você deve adicionar esse atributo para todos os produtos;
-> A página de detalhes deve possuir o (nome), a (imagem), o (preço) e qualquer outra informação adicional do produto que você desejar;
-> Adicione o atributo data-testid="product-detail-name" no elemento que, na tela de detalhes, possui o nome do produto.
*/

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getByProductId(id);
    this.setState({
      loading: false,
      product: result,
    });
  }

  render() {
    const { loading, product } = this.state;
    return (
      <div>
        {loading ? (<h1> CARREGANDO...</h1>)
          : (
            <div>
              <div>
                <h3 data-testid="product-detail-name">{product.title}</h3>
                <p>
                  preço:
                  {product.price}
                </p>
              </div>
              <div>
                <img src={ product.thumbnail } alt={ product.title } />
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
