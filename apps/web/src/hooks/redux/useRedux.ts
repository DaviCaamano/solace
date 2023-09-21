import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@context/redux';
import { clearContent, setContent } from '@context/redux/editor/editor';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//Editor Hook
export const useEditor = () => {
  const dispatch = useDispatch();

  return {
    setContent: (content: string) => dispatch(setContent(content)),
    clearContent: () => dispatch(clearContent()),
    editor: useAppSelector((state: RootState) => state.editor),
  };
};
