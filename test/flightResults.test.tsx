import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlightResults from './src/pages/FlightResults';

describe('FlightResults', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/flight-results?origin=JFK&destination=LAX&departDate=2025-05-10&returnDate=2025-05-20&travelClass=economy&passengers=2']}>
        <FlightResults />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error if required params are missing', () => {
    render(
      <MemoryRouter initialEntries={['/flight-results']}>
        <FlightResults />
      </MemoryRouter>
    );

    expect(screen.getByText(/missing search parameters/i)).toBeInTheDocument();
  });
});
