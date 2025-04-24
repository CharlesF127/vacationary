import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HotelSearchForm from './src/components/HotelSearchForm';
import { toast } from 'sonner';
import React from 'react';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HotelSearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error toast when fields are empty', async () => {
    render(
      <BrowserRouter>
        <HotelSearchForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /search hotels/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill in all required fields");
    });
  });

  it('renders destination input field', () => {
    render(
      <BrowserRouter>
        <HotelSearchForm />
      </BrowserRouter>
    );

    const destinationInput = screen.getByPlaceholderText(/city, hotel, or location/i);
    expect(destinationInput).toBeInTheDocument();
  });

  it('renders check-in and check-out date selectors', () => {
    render(
      <BrowserRouter>
        <HotelSearchForm />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('button', { name: /select date/i })).toHaveLength(2);
  });
});
