import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';

const mockProfile = {
  id: '1',
  name: {
    first: 'John',
    last: 'Doe',
  },
  picture: {
    thumbnail: 'https://example.com/thumbnail.jpg',
  },
  email: 'john.doe@example.com',
  gender: 'male',
  showDetails: false,
};

test('renders profile component with details hidden by default', () => {
  const { getByText, queryByText } = render(<Profile profile={mockProfile} />);
  const nameElement = getByText(/John Doe/i);
  expect(nameElement).toBeInTheDocument();
  const detailsElement = queryByText(/Email:/);
  expect(detailsElement).toBeNull();
});


test('calls onDelete callback when "Delete" button is clicked', () => {
  const onDeleteMock = jest.fn();
  const { getByText } = render(<Profile profile={mockProfile} onDelete={onDeleteMock} />);
  const deleteButton = getByText(/Delete/i);
  fireEvent.click(deleteButton);
  expect(onDeleteMock).toHaveBeenCalledWith(mockProfile.id);
});
