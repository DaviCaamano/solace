import Image from 'next/image';
import { useState } from 'react';
import { ContentWindow } from '@interface/Landing';

interface MenuContainerProps {
  setContentWindow: Setter<ContentWindow>;
}
export const NoteMenu = ({ setContentWindow }: MenuContainerProps) => {
  return (
    <div id={'menu-container'} className={'flex flex-1 flex-col md:flex-row justify-center items-center pb-[10%]'}>
      <AddNoteButton onClick={() => setContentWindow(ContentWindow.addNote)} />
      <div className={'flex flex-row md:flex-col m-2 sm:m-4'}>
        <NoteHistoryButton onClick={() => setContentWindow(ContentWindow.history)} />
        <div className={'m-1 sm:m-2'} />
        <ScheduleNoteButton onClick={() => setContentWindow(ContentWindow.scheduler)} />
      </div>
    </div>
  );
};

const usePress = (): [string, () => void, () => void] => {
  const [pressed, setPressed] = useState<boolean>(false);
  return [
    pressed ? pressedButtonCss : noteButtonCss,
    () => {
      setPressed(true);
    },
    () => {
      setPressed(false);
    },
  ];
};

interface NoteHistoryButtonProps {
  onClick: () => any;
}

const noteButtonCss = 'hover:bg-mug-dark bg-mug relative rounded-2xl cursor-pointer p-6';
const pressedButtonCss = 'bg-mug relative rounded-2xl cursor-pointer p-6';
const smallButtonDimensions = 'w-[6.25rem] h-[6.25rem] sm:w-[10rem] sm:h-[10rem] lg:w-[15rem] lg:h-[15rem]';
const largeButtonDimensions = 'w-[13.5rem] h-[13.5rem] sm:w-[21rem] sm:h-[21rem] lg:w-[31rem] lg:h-[31rem]';

export const AddNoteButton = ({ onClick }: NoteHistoryButtonProps) => {
  const [css, onMouseDown, onMouseUp] = usePress();
  return (
    <div
      id={'menu-container'}
      className={`${largeButtonDimensions} ${css}`}
      style={{ transition: 'all 0.75s ease' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onClick}
    >
      <div className={'relative w-full h-full'}>
        <Image src={'/images/icons/add-note.svg'} alt={'Click here to add a note!'} fill={true} />
      </div>
    </div>
  );
};

export const NoteHistoryButton = ({ onClick }: NoteHistoryButtonProps) => {
  const [css, onMouseDown, onMouseUp] = usePress();
  return (
    <div
      className={`flex flex-col relative ${smallButtonDimensions} ${css}`}
      style={{ transition: 'all 0.75s ease' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onClick}
    >
      <Image src={'/images/icons/note-history.svg'} alt={'Click here to add a note!'} fill={true} />
    </div>
  );
};

export const ScheduleNoteButton = ({ onClick }: NoteHistoryButtonProps) => {
  const [css, onMouseDown, onMouseUp] = usePress();
  return (
    <div
      className={`flex flex-col relative ${smallButtonDimensions} ${css}`}
      style={{ transition: 'all 0.75s ease' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onClick}
    >
      <Image src={'/images/icons/schedule-note.svg'} alt={'Click here to add a note!'} fill={true} />
    </div>
  );
};
