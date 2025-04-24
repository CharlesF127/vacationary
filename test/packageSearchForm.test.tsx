import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PackageSearchForm from '../src/components/PackageSearchForm';
import { toast } from 'sonner';
import React from 'react';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PackageSearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error toast when required fields are empty', async () => {
    render(
      <BrowserRouter>
        <PackageSearchForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /search packages/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fill in all required fields');
    });
  });

  it('renders origin and destination input fields', () => {
    render(
      <BrowserRouter>
        <PackageSearchForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
  });


  it('renders departure and return date buttons', () => {
    render(
      <BrowserRouter>
        <PackageSearchForm />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('button', { name: /select date/i }).length).toBe(2);
  });
});
