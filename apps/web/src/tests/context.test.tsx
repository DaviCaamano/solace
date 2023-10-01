import { render, screen } from '@testing-library/react';
import { Editor } from '@components/editor';
import { Providers } from '@components/providers/Providers';
import { setContent } from '@context/redux';

describe('Editor Menu Buttons', () => {

  render(
    <Providers>
      <Editor />
    </Providers>,
  );

  test('click bold button', () => {
    const onPaste = jest.fn();
    const { getByDisplayValue } = render(<input value='' onPaste={onPaste} onChange={() => {}} />);

    const inputElement = getByDisplayValue('');

    // `ClipboardEvent` extends `Event`. Start with creating a new `Event`
    // with 'paste' as the`typearg`
    const clipboardEvent = new Event('paste', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // set `clipboardData` and `getData` properties. Set your mocked properties here
    clipboardEvent['clipboardData'] = {
      getData: () => '123456',
    };

    // dispatch your event to trigger your event handlers
    inputElement.dispatchEvent(clipboardEvent);

    setContent('testing');
    const textEditor = screen.getByTestId('text-editor');
    const boldButton = screen.getByRole('button', { name: 'editor-bold-button' });
    boldButton.click();
    console.log(textEditor.children[0]);
  });
  //
  // test('click italics button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const italicButton = screen.getByRole('button', { name: 'editor-italic-button' });
  // });
  //
  // test('click underline button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const underlineButton = screen.getByRole('button', { name: 'editor-underline-button' });
  // });
  //
  // test('click strike button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const strikeButton = screen.getByRole('button', { name: 'editor-strike-button' });
  // });
  //
  // test('click quote button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const blockQuoteButton = screen.getByRole('button', { name: 'editor-block-quote-button' });
  // });
  //
  // test('click code block button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const codeBlockButton = screen.getByRole('button', { name: 'code-block-button-container' });
  // });
  //
  // test('click highlight button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const highlightButton = screen.getByRole('button', { name: 'editor-highlight-button' });
  // });
  //
  // test('click link button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const linkButton = screen.getByRole('button', { name: 'editor-clear-link-button' });
  // });
  //
  // test('click clear link button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const clearLinkButton = screen.getByRole('button', { name: 'editor-clear-link-button' });
  // });
  //
  // test('click bullet button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const bulletButton = screen.getByRole('button', { name: 'bullet-list-button' });
  // });
  //
  // test('click ordered list button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const orderedListButton = screen.getByRole('button', { name: 'ordered-list-button' });
  // });
  //
  // test('click subscript button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const subscriptButton = screen.getByRole('button', { name: 'editor-subscript-button' });
  // });
  //
  // test('click superscript button', () => {
  //   setContent('testing');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const superScriptButton = screen.getByRole('button', { name: 'editor-superscript-button' });
  // });
});
