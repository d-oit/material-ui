import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import LinkItem from '../src/components/LinkItem';

describe('LinkItem', () => {
  it('renders link title and URL', () => {
    render(<LinkItem title="Test Link" url="https://example.com" />);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('calls delete handler when button is clicked', async () => {
    const mockDelete = jest.fn();
    const user = userEvent.setup();
    
    render(<LinkItem onDelete={mockDelete} />);
    
    const button = screen.getByRole('button', { name: 'Delete' });
    
    await act(async () => {
      await user.click(button);
    });

    expect(mockDelete).toHaveBeenCalled();
  });
});
