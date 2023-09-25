import colors from '@styles/tailwind/colors';
import { Editor } from '@components/notes';
import { Editor as TipTapEditor } from '@tiptap/react';
import { useTipTap } from '@hooks/lib/tiptap';

export const AddNote = () => {
  const editor: TipTapEditor | null = useTipTap();
  return (
    <div id={'add-note'} className={'flex flex-col md:flex-row justify-center items-center pb-[10%] bg-red'}>
      <div className={`${editorDimensions} rounded-2xl bg-latte overflow-hidden w-full h-[100px]`}>
        <div
          className={'w-full h-full relative'}
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 28px, ${colors.mug} 28px, ${colors.mug} 30px, transparent 26px)`,
            backgroundSize: '100% 2rem',
            backgroundAttachment: 'local',
          }}
        >
          {/*<textarea*/}
          {/*  className={'w-full h-full bg-latte pl-8 pt-8 pr-4 pb-4 scrollbar-thin'}*/}
          {/*  style={{*/}
          {/*    backgroundImage: `linear-gradient(${colors['brown-dark']} .1em, transparent .1em), linear-gradient(90deg, transparent 28px, ${colors.mug} 28px, ${colors.mug} 30px, transparent 26px)`,*/}
          {/*    backgroundSize: '100% 2rem',*/}
          {/*    backgroundAttachment: 'local',*/}
          {/*    lineHeight: '2rem',*/}
          {/*    fontSize: '1.5rem',*/}
          {/*  }}*/}
          {/*  value={content}*/}
          {/*  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}*/}
          {/*/>*/}

          <Editor editor={editor} />
        </div>
      </div>
    </div>
  );
};

const editorDimensions = 'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';
