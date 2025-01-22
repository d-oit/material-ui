import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LinkItem from './LinkItem';

describe('LinkItem', () => {
  it('renders link title and URL', () => {
    render(<LinkItem title="Test Link" url="https://example.com" />);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('calls delete handler when button is clicked', async () => {
    const mockDelete = jest.fn();
    render(<LinkItem onDelete={mockDelete} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(mockDelete).toHaveBeenCalled();
  });
});
