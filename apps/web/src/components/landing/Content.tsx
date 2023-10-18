import { AnimatePresence } from 'framer-motion';
import { Notebook } from '@components/notebook';
import { Editor } from '@components/editor';
import { ContentSlider, useUserNavigation } from './';
import { EditorViewMode } from '@interface/editor';

export const Content = () => {
  const viewMode = useUserNavigation();
  console.log('viewMode', viewMode);
  return (
    <div id={'content'} className={'relative w-full flex-1'}>
      <AnimatePresence>
        <ContentSlider key={'editor-notebook'} open={viewMode === EditorViewMode.notebook}>
          <Notebook />
        </ContentSlider>
        <ContentSlider key={'editor-content'} open={viewMode === EditorViewMode.editor}>
          <Editor />
        </ContentSlider>
      </AnimatePresence>
    </div>
  );
};
