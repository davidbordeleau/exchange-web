import React from "react";
import CurrencyItem from "./CurrencyItem";
import currencies from "./currencies";
import axios from "axios";

class CurrenciesSelect extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange() {
    const fromSelectValue = document.getElementById('from-currency').value;
    const toSelectValue = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;
    const responseRate = document.getElementById('convertion-response');
    if (!amount || !fromSelectValue || !toSelectValue) return;

    axios.post(process.env['REACT_APP_BACKEND_URL'], {currency_from: fromSelectValue, currency_to: toSelectValue, amount: amount})
      .then(response => {
        let formatterFrom = this.formatAmount(fromSelectValue);
        let formatterTo = this.formatAmount(toSelectValue);

        const result = `${formatterFrom.format(amount)} = ${formatterTo.format(response['data'])}`;

        responseRate.textContent=result;
      }).catch(function(error) {
        if (error.response) {
          const result = error.response['data']['error'];

          responseRate.textContent=result;
        }
      });
  }

  formatAmount(currency) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency,
    });
  }

  componentDidMount() {
    window.addEventListener('load', this.handleChange());
  }

  render() {
    const currencyValues = currencies.map(item => <CurrencyItem key={item} item={item} />);

    return (
      <div>
        <div className="center">
          <div className="container">
            <label>Amount</label>
            <div className="select-box">
              <input id="amount" className="content" defaultValue="1" type="number" onChange={() => this.handleChange()} />
            </div>
          </div>
          <div className="container">
            <label>From</label>
            <div className="select-box">
              <select id="from-currency" className="content" onChange={() => this.handleChange()}>
                {currencyValues}
              </select>
            </div>
          </div>
          <div className="container">
            <label>To</label>
            <div className="select-box">
              <select id="to-currency" className="content" defaultValue="USD" onChange={() => this.handleChange()}>
                {currencyValues}
              </select>
            </div>
          </div>
        </div>

        <p id="convertion-response"></p>
      </div>
    );
  }
}

export default CurrenciesSelect;
