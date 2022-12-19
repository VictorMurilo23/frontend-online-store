import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blackStar from '../imgs/estrela-preta.png';
import blankStar from '../imgs/estrela.png';

export default class AvaliationForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      starCount: 0,
      message: '',
    };
  }

  handleChange = ({ target }) => {
    const stateName = target.name;
    this.setState({
      [stateName]: target.value,
    });
  }

  changeStarCount = (numberOfStars) => {
    this.setState({
      starCount: numberOfStars,
    });
  }

  clearAvaliationForm = () => {
    this.setState({
      email: '',
      starCount: 0,
      message: '',
    });
  }

  submitAvaliation = () => {
    const { saveAvaliation } = this.props;
    const { email, message, starCount } = this.state;
    const avaliation = {
      message,
      email,
      starCount,
    };
    saveAvaliation(avaliation);
    this.clearAvaliationForm();
  }

  render() {
    const stars = ['1', '2', '3', '4', '5'];
    const { message, email, starCount } = this.state;
    return (
      <>
        <div>
          <input
            type="text"
            className="avaliation-form-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
            data-testid="product-detail-email"
          />
        </div>
        <div>
          <input
            type="text"
            className="avaliation-form-input"
            name="message"
            value={ message }
            onChange={ this.handleChange }
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
          />
        </div>
        <div>
          {
            stars.map((number) => (
              <button
                key={ `Estrela ${number}` }
                data-testid={ `${number}-rating` }
                className="stars-button"
                onClick={ () => { this.changeStarCount(Number(number)); } }
                type="button"
              >
                <img
                  src={ starCount >= Number(number) ? blackStar : blankStar }
                  alt={ `Estrela ${number}` }
                />
              </button>
            ))
          }
        </div>
        <div>
          <button
            type="button"
            data-testid="submit-review-btn"
            className="submit-avaliation-button"
            onClick={ this.submitAvaliation }
          >
            Avaliar
          </button>
        </div>
      </>
    );
  }
}

AvaliationForm.propTypes = {
  saveAvaliation: PropTypes.func.isRequired,
};
