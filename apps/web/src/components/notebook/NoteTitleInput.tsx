import { RefObject } from 'react';

type InputRef = RefObject<HTMLInputElement>;

export const NoteTitleInput = ({
  toggle,
  inputRef,
  onSubmit,
  setToggle,
  title,
  setTitle,
}: {
  toggle: boolean;
  inputRef: InputRef;
  onSubmit: () => void;
  setToggle: Setter<boolean>;
  title: string;
  setTitle: Setter<string>;
}) => (
  <input
    id={'add-note-input'}
    data-testid={'add-note-input'}
    className={`${toggle ? 'block' : 'pointer-events-none'} flex-1 px-2 border-0 bg-mug text-xl`}
    ref={inputRef}
    placeholder={toggle ? 'Title' : ''}
    onBlur={() => {
      if (!title) {
        setToggle(false);
      }
    }}
    value={title}
    onChange={(event) => setTitle(event.target.value)}
    onKeyUp={(event) => event.key === 'Enter' && onSubmit()}
  />
);
