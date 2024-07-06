import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { createMessage, deleteMessage, editMessage, getMessages } from './api';

// Mock API functions
jest.mock('./api');

const mockMessages = [
  { _id: '1', name: 'Message 1', description: 'Description 1' },
  { _id: '2', name: 'Message 2', description: 'Description 2' },
];

beforeEach(() => {
  getMessages.mockResolvedValue(mockMessages);
  createMessage.mockResolvedValue({});
  deleteMessage.mockResolvedValue({});
  editMessage.mockResolvedValue({});
});

test('renders messages', async () => {
  render(<App />);

  // Verify that the messages are rendered
  await waitFor(() => expect(screen.getByText('Message 1')).toBeInTheDocument());
  expect(screen.getByText('Description 1')).toBeInTheDocument();
  expect(screen.getByText('Message 2')).toBeInTheDocument();
  expect(screen.getByText('Description 2')).toBeInTheDocument();
});

test('creates a new message', async () => {
  render(<App />);

  // Input new message details
  fireEvent.change(screen.getByDisplayValue('name'), { target: { value: 'New Message' } });
  fireEvent.change(screen.getByDisplayValue('description'), { target: { value: 'New Description' } });

  // Click send button
  fireEvent.click(screen.getByText('Отправить'));

  // Verify that createMessage was called
  await waitFor(() => {
    expect(createMessage).toHaveBeenCalledWith({ name: 'New Message', description: 'New Description' });
  });
});

test('edits an existing message', async () => {
  render(<App />);

  // Wait for messages to load and then edit the first message
  await waitFor(() => expect(screen.getByText('Message 1')).toBeInTheDocument());
  fireEvent.click(screen.getAllByText('')[0]); // Click edit button

  // Ensure inputs are updated with the selected message details
  await waitFor(() => {
    expect(screen.getByText('Message 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  // Input new details for the message
  fireEvent.change(screen.getByText('Message 1'), { target: { value: 'Updated Message' } });
  fireEvent.change(screen.getByText('Description 1'), { target: { value: 'Updated Description' } });

  // Click edit button
  fireEvent.click(screen.getByText('Изменить'));

  // Verify that editMessage was called
  await waitFor(() => {
    expect(editMessage).toHaveBeenCalledWith({ _id: '1', name: 'Updated Message', description: 'Updated Description' });
  });
});


test('deletes a message', async () => {
  render(<App />);

  // Wait for messages to load and then delete the first message
  await waitFor(() => expect(screen.getByText('Message 1')).toBeInTheDocument());
  fireEvent.click(screen.getAllByText('X')[0]);

  // Verify that deleteMessage was called
  await waitFor(() => {
    expect(deleteMessage).toHaveBeenCalledWith({ _id: '1' });
  });
});
