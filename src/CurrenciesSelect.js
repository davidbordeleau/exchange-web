import React from "react";
import CurrencyItem from "./CurrencyItem";
import currencies from "./currencies";
import axios from "axios";
const maximumAmount = 100_000_000

class CurrenciesSelect extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.fromCurrency = React.createRef();
    this.toCurrency = React.createRef();
    this.amountInput = React.createRef();
    this.responseRate = React.createRef();
  };

  handleChange() {
    const fromSelectValue = this.fromCurrency.current.value;
    const toSelectValue = this.toCurrency.current.value;
    const amountInput = this.amountInput.current;
    const amountValue = amountInput.value;
    const responseRate = this.responseRate.current;

    if (!amountValue || !fromSelectValue || !toSelectValue) return;
    if (parseInt(amountValue) >= maximumAmount) {
      responseRate.textContent = 'amount is too high';
      amountInput.value = maximumAmount - 1
      return;
    }

    axios.get(process.env['REACT_APP_BACKEND_URL'], { params: { currency_from: fromSelectValue, currency_to: toSelectValue, amount: amountValue } })
      .then(response => {
        let formatterFrom = this.formatAmount(fromSelectValue);
        let formatterTo = this.formatAmount(toSelectValue);

        const result = `${formatterFrom.format(amountValue)} = ${formatterTo.format(response['data']['amount_result'])}`;

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
      maximumFractionDigits: 5,
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
              <input id="amount" ref={this.amountInput} className="content" defaultValue="1" type="number" onChange={() => this.handleChange()} />
            </div>
          </div>
          <div className="container">
            <label>From</label>
            <div className="select-box">
              <select id="from-currency" ref={this.fromCurrency} className="content" onChange={() => this.handleChange()}>
                {currencyValues}
              </select>
            </div>
          </div>
          <div className="container">
            <label>To</label>
            <div className="select-box">
              <select id="to-currency" ref={this.toCurrency} className="content" defaultValue="USD" onChange={() => this.handleChange()}>
                {currencyValues}
              </select>
            </div>
          </div>
        </div>

        <p id="convertion-response" ref={this.responseRate}></p>
      </div>
    );
  }
}

export default CurrenciesSelect;
