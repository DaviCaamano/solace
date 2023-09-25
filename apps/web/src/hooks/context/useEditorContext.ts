//Editor Hook
import { useDispatch } from 'react-redux';
import { clearContent, RootState, setContent } from '@context/redux';
import { useAppSelector } from '@hooks/context/useRedux';

export const useEditorContext = () => {
  const dispatch = useDispatch();

  return {
    setContent: (content: string) => dispatch(setContent(content)),
    clearContent: () => dispatch(clearContent()),
    editor: useAppSelector((state: RootState) => state.editor),
  };
};
