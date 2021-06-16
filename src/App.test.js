import { render, screen, fireEvent } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

import App from './App';
import AllArticles from '../src/pages/AllArticles'
import OneAuthor from '../src/pages/OneAuthor'
import React from "react";

test('renders initial landing page', () => {
  render(<App />);

  const linkElement = screen.getByText(/Pick from selected filters/i);

  expect(linkElement).toBeInTheDocument();
});


test('click Therapy button to query on relevant docs with Psychiatry and Therapy in them', async () => {
  render(<AllArticles />);

  fireEvent.click(screen.getByText('Therapy'))

  const items = await screen.findAllByText(/Published/i)
  expect(items).toHaveLength(3)
});


// test util for router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}


test('rendering author page and articles they have', async () => {
  const route = '/author/?name=Mo%20Chen'
  renderWithRouter(<OneAuthor />, { route })

  const items = await screen.findAllByText(/Published/i)
  expect(items).toHaveLength(30)
})

