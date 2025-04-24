import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HotelResults from '../src/pages/HotelResults';

describe('HotelResults', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/hotel-results?destination=Paris&checkIn=2025-05-10&checkOut=2025-05-15&rooms=1&guests=2']}>
        <HotelResults />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error if required params are missing', () => {
    render(
      <MemoryRouter initialEntries={['/hotel-results']}>
        <HotelResults />
      </MemoryRouter>
    );

    expect(screen.getByText(/missing search parameters/i)).toBeInTheDocument();
  });
});
