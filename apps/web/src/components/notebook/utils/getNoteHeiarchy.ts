import { TreeNote } from '#interfaces/notes';

export const getNoteGeneration = (parentId: string | undefined | null = null, list: TreeNote[]) => {
  let selectedNote: TreeNote | undefined;
  list = list.filter((note: TreeNote) => {
    if (note.id === parentId) {
      selectedNote = note;
    }
    return note.parentId === parentId;
  });
  return { selectedNote, list };
};
