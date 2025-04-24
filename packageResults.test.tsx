import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PackageResults from './src/pages/PackageResults';

describe('PackageResults', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/package-results?origin=NYC&destination=Bali&departDate=2025-06-01&returnDate=2025-06-10&travelers=2']}>
        <PackageResults />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error if required params are missing', () => {
    render(
      <MemoryRouter initialEntries={['/package-results']}>
        <PackageResults />
      </MemoryRouter>
    );

    expect(screen.getByText(/missing search parameters/i)).toBeInTheDocument();
  });
});
