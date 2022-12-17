import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blackStar from '../imgs/estrela-preta.png';
import blankStar from '../imgs/estrela.png';

export default class Avaliations extends Component {
  render() {
    const { productAvaliations } = this.props;
    const stars = ['1', '2', '3', '4', '5'];
    return (
      <>
        {
          productAvaliations.map((avaliation, index) => (
            <div key={ `Avaliação ${index}` }>
              <p>
                { avaliation.message }
              </p>
              <p>
                { avaliation.email }
              </p>
              {
                stars.map((number) => (
                  <img
                    className="stars-button"
                    key={ `Avaliação ${index}, estrela ${number}` }
                    src={ avaliation.starCount >= Number(number) ? blackStar : blankStar }
                    alt={ `Estrela ${number}` }
                  />
                ))
              }
            </div>
          ))
        }

      </>
    );
  }
}

Avaliations.propTypes = {
  productAvaliations: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      email: PropTypes.string,
      starCount: PropTypes.number,
    }),
  ).isRequired,
};
