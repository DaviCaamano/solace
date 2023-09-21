import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Editor } from '@interface/editor/editor';

const initialState: Editor = {
  content: '',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent: (state: Editor, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    clearContent: (state: Editor) => {
      state.content = '';
    },
  },
});

export const { setContent, clearContent } = editorSlice.actions;

export default editorSlice.reducer;
