import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';


jest.mock('axios');
jest.mock('./App.css', () => ({}));


const mockProfile = {
  id: 1,
  name: {
    first: 'John',
    last: 'Doe',
  },
  picture: {
    thumbnail: 'https://example.com/thumbnail.jpg',
  },
  email: 'john.doe@example.com',
  gender: 'male',
};

describe('App Component', () => {
  it('renders the app and fetches profiles', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [mockProfile],
      },
    });

    const { getByText } = render(<App />);

    // Check if the initial profile is rendered
    await waitFor(() => expect(getByText(/John Doe/i)).toBeInTheDocument());
  });

  it('adds a profile when "Add Profile" button is clicked', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [mockProfile],
      },
    });

    const { getByText } = render(<App />);

    // Check if the initial profile is rendered
    await waitFor(() => expect(getByText(/John Doe/i)).toBeInTheDocument());

    // Mocking axios.get to resolve with another sample data
    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ id: 2, name: { first: 'Jane', last: 'Doe' } }],
      },
    });

    // Click the "Add Profile" button
    fireEvent.click(getByText(/Add Profile/i));

    // Check if the new profile is rendered
    await waitFor(() => expect(getByText(/Jane Doe/i)).toBeInTheDocument());
  });
});
