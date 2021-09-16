import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Confirmation extends Component {
  renderOrderSummary() {
    const { order, onBackToHome } = this.props;

    if (!order) {
      return null;
    }

    return (
      <div className="confirmation">
          <div className="confirmation__wrapper">
          <div className="confirmation__wrapper-message">
               <h2>Thank you for your purchase</h2>
              <p className="confirmation__wrapper-reference">
                  <span>Order ref:</span> {order.customer_reference}
              </p>
          </div>
          <Link
              className="confirmation__wrapper-back"
              type="button"
              to="/"
              onClick={onBackToHome}
          >
           
              <span>Back to home</span>
          </Link>
          </div>
      </div>
    );
  }

  render() {
    return (
      <>
        { this.renderOrderSummary() }
      </>
    );
};
}

export default Confirmation;