import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Editor } from '@interface/editor/editor';

const initialState: Editor = {
  content: '',
  title: '',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor: (state: Editor, action: PayloadAction<Editor>) => {
      state.id = action.payload.id;
      state.content = action.payload.content;
      state.title = action.payload.title;
    },
    setContent: (state: Editor, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    reset: (state: Editor) => {
      state.id = undefined;
      state.content = '';
      state.title = '';
    },
    setTitle: (state: Editor, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { reset, setEditor, setContent, setTitle } = editorSlice.actions;

export default editorSlice.reducer;
