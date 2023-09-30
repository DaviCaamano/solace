import { render, screen } from '@testing-library/react';
import { Editor } from '@components/editor';

test('click add note button', () => {
  render(<Editor />);
  const linkElement = screen.getByRole('button', { name: 'editor-menu-button' });



});
