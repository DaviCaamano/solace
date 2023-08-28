'use client';

import { Provider } from 'react-redux';
import { store } from '@context/redux';
import { notesSlice } from '@context/redux/notes';
import { userSlice } from '@context/redux/user';

store.dispatch(notesSlice.endpoints.getNotes.initiate());
store.dispatch(userSlice.endpoints.getNotes.initiate());

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
