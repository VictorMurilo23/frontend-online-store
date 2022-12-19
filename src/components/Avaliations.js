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
            <div key={ `Avaliação ${index}` } className="avaliation-card">
              <div className="user-avaliation-stars-container">
                {
                  stars.map((number) => (
                    <img
                      className="stars-button"
                      key={ `Avaliação ${index}, estrela ${number}` }
                      src={ avaliation
                        .starCount >= Number(number) ? blackStar : blankStar }
                      alt={ `Estrela ${number}` }
                    />
                  ))
                }
              </div>
              <div className="user-avaliation-message-container">
                <p>
                  { avaliation.message }
                </p>
              </div>
              <div className="user-avaliation-email-container">
                <p>
                  { avaliation.email }
                </p>
              </div>
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
