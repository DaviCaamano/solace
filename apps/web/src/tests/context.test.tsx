import { render, screen } from '@testing-library/react';
import { Content } from '@components/landing';

test('click add note button', () => {
  render(<Content />);
  const linkElement = screen.getByTestId('add-note-button-menu-container');
});
