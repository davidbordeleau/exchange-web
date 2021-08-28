import React from 'react';
import './App.css';
import CurrenciesSelect from './CurrenciesSelect'

function App() {
  return (
    <div className="App">
      <p>
        Convert from any currency to any currency
      </p>
      <header className="App-header">
        <i>Currency Converter</i>
        <CurrenciesSelect />
      </header>
    </div>
  );
}

export default App;
