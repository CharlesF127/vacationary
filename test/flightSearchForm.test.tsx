import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FlightSearchForm from '../src/components/FlightSearchForm';
import { toast } from 'sonner';
import React from 'react';
import '@testing-library/jest-dom';

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

describe('FlightSearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error toast when required fields are empty', async () => {
    render(
      <BrowserRouter>
        <FlightSearchForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /search flights/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill in all required fields");
    });
  });

  it('renders all trip type radio options', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/round trip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/one way/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/multi-city/i)).toBeInTheDocument();
  });

  it('renders origin and destination input fields', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
  });

  it('renders a submit button with correct text', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /search flights/i })).toBeInTheDocument();
  });

});
