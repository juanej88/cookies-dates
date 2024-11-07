import { act } from 'react';
import { screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import EventForm from '../EventForm';

it('renders the EventForm component correctly', () => {
  const formData = {
    event_type: 'birthday',
    name: '',
    dateInput: '',
    date: '',
    notify: true,
    notification_days: 0,
    operation: 'add-event',
  };
  const setFormData = jest.fn();

  const container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOMClient.createRoot(container).render(<EventForm formData={formData} setFormData={setFormData} />);
  });

  // Check if all form elements are rendered
  expect(screen.getByRole('radio', { name: /birthday/i })).toBeChecked();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/notification/i)).toBeInTheDocument();
});