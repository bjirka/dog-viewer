import { act, render, screen, waitFor } from '@testing-library/react';
import Search from './components/pages/home/Search';
import Header from './components/Header'
import { BrowserRouter as Router } from 'react-router-dom';

describe('App Tests', () => {
  test('renders Pick Your Options box', () => {
      render(<Search />);
      const headerText = screen.getByText(/pick your options/i);
      expect(headerText).toBeInTheDocument();
    
  });

   test('header displays Dog Viewer link', () => {
       render(<Router><Header /></Router>);
       expect(screen.getByText(/dog viewer/i)).toBeInTheDocument();
   });
});