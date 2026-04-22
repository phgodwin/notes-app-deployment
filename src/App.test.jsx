import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Sticky Notes App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('shows empty state initially', () => {
    expect(screen.getByText(/No notes yet/i)).toBeInTheDocument();
  });

  it('adds a new note', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText(/New note content/i);
    const addButton = screen.getByRole('button', { name: /Create Note/i });

    await user.type(input, 'Test note');
    await user.click(addButton);

    expect(screen.getByDisplayValue('Test note')).toBeInTheDocument();
    expect(screen.queryByText(/No notes yet/i)).toBeNull();
  });

  it('updates an existing note', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText(/New note content/i);
    const addButton = screen.getByRole('button', { name: /Create Note/i });

    await user.type(input, 'Update me');
    await user.click(addButton);

    const noteTextarea = screen.getByDisplayValue('Update me');
    await user.clear(noteTextarea);
    await user.type(noteTextarea, 'Updated content');

    expect(screen.getByDisplayValue('Updated content')).toBeInTheDocument();
  });

  it('deletes a note', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText(/New note content/i);
    const addButton = screen.getByRole('button', { name: /Create Note/i });

    await user.type(input, 'Delete me');
    await user.click(addButton);

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    await user.click(deleteButton);

    expect(screen.queryByDisplayValue('Delete me')).toBeNull();
    expect(screen.getByText(/No notes yet/i)).toBeInTheDocument();
  });
});
