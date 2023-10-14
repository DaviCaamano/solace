import { AnimatePresence } from 'framer-motion';
import { Notebook } from '@components/notebook';
import { ContentWindow } from '@interface/Landing';
import { Editor } from '@components/editor';
import { ContentSlider, useUserNavigation } from './';

export const Content = () => {
  const [window, setWindow] = useUserNavigation();

  return (
    <div id={'content'} className={'relative w-full flex-1'}>
      <AnimatePresence>
        <ContentSlider key={'editor-notebook'} open={window === ContentWindow.notebook}>
          <Notebook window={window} setWindow={setWindow} />
        </ContentSlider>
        <ContentSlider key={'editor-content'} open={window === ContentWindow.editor}>
          <Editor setWindow={setWindow} />
        </ContentSlider>
      </AnimatePresence>
    </div>
  );
};
