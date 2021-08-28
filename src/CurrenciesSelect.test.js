import React from 'react';
import { render } from '@testing-library/react';
import CurrenciesSelect from './CurrenciesSelect';

test("renders the 'from' select tag", () => {
  const result = render(<CurrenciesSelect />);
  const selectFrom = result.container.querySelector('#from-currency');
  expect(selectFrom).toBeInTheDocument();
});

test("renders the 'to' select tag", () => {
  const result = render(<CurrenciesSelect />);
  const selectTo = result.container.querySelector('#to-currency');
  expect(selectTo).toBeInTheDocument();
});

test("renders the amount input tag", () => {
  const result = render(<CurrenciesSelect />);
  const inputAmount = result.container.querySelector('#amount');
  expect(inputAmount).toBeInTheDocument();
});

test("renders the response", () => {
  const result = render(<CurrenciesSelect />);
  const responseConvertion = result.container.querySelector('#convertion-response');
  expect(responseConvertion).toBeInTheDocument();
});
