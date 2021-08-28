import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the headers', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Convert from any currency to any currency/i);
  expect(headerElement).toBeInTheDocument();

  const italicElement = getByText(/Currency Converter/i);
  expect(italicElement).toBeInTheDocument();
});
