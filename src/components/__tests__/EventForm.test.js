import { act } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import EventForm from '../EventForm';

describe('Event Form', () => {
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
  
    act(() => {
      render(<EventForm formData={formData} setFormData={setFormData} btnTag={'Add'} type={'add'} />);
    });

    const submitButton = screen.getByRole('button', { name: /add/i });
  
    // Check if all form elements are rendered
    expect(screen.getByRole('radio', { name: /birthday/i })).toBeChecked();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notification/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows an error message when the name input is incorrect', () => {
    const formData = {
      event_type: 'birthday',
      name: 'John $mith',
      dateInput: '31/01/2000',
      date: '2000-01-31',
      notify: true,
      notification_days: 0,
      operation: 'add-event',
    };
    const setFormData = jest.fn();
  
    act(() => {
      render(<EventForm formData={formData} setFormData={setFormData} btnTag={'Add'} type={'add'} />);
    });

    // Check if the error message shows up
    expect(screen.getByText(/the name contains invalid characters/i)).toBeInTheDocument();
  });

  it('enables the submit button when the inputs are correct', () => {
    const formData = {
      event_type: 'birthday',
      name: 'John Smith',
      dateInput: '31/01/2000',
      date: '2000-01-31',
      notify: true,
      notification_days: 0,
      operation: 'add-event',
    };
    const setFormData = jest.fn();
  
    act(() => {
      render(<EventForm formData={formData} setFormData={setFormData} btnTag={'Add'} type={'add'} />);
    });

    const submitButton = screen.getByRole('button', { name: /add/i });

    // Check if the submitButton is enabled
    expect(submitButton).toBeEnabled();
  });
});