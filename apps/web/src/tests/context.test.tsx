import { screen } from '@testing-library/react';

import { Editor } from '@components/editor';
import { Providers } from '@components/providers/Providers';
import { render } from '@utils/testing';

describe('Editor Menu Buttons', () => {
  test('Bold Button Click', async () => {
    const { user } = render(
      <Providers>
        <Editor initialText={'<p>init</p>'} />
      </Providers>,
    );

    const boldButton = screen.getByTestId('editor-bold-button');
    const textElement = screen.getByText('init');
    const testString = 'testing';
    await user.click(boldButton);
    await user.keyboard(testString);

    expect(textElement.innerHTML).toMatch(/^<strong>/);
  });

  test('Bold italics Click', async () => {
    const { user } = render(
      <Providers>
        <Editor initialText={'<p>init</p>'} />
      </Providers>,
    );

    const boldButton = screen.getByTestId('editor-italic-button');
    const textElement = screen.getByText('init');
    const testString = 'testing';
    await user.click(boldButton);
    await user.keyboard(testString);

    expect(textElement.innerHTML).toMatch(/^<em>/);
  });

  test('Bold underline Click', async () => {
    const { user } = render(
      <Providers>
        <Editor initialText={'<p>init</p>'} />
      </Providers>,
    );

    const boldButton = screen.getByTestId('editor-underline-button');
    const textElement = screen.getByText('init');
    const testString = 'testing';
    await user.click(boldButton);
    await user.keyboard(testString);

    expect(textElement.innerHTML).toMatch(/^<em>/);
  });

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
