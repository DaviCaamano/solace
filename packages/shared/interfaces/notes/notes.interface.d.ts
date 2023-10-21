import { CreateNoteDto } from '~note/dto/note.dto';
import { RefObject } from 'react';
import { DraggableEventHandler } from 'react-draggable';
export interface Note {
    id: string;
    title: string;
    content: string;
    parentId?: string;
    next?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    status: NoteStatus;
}
export declare enum NoteStatus {
    active = "ACTIVE",
    deleted = "DELETED"
}
export declare enum MoveNotePosition {
    childOf = "childOf",
    aheadOf = "aheadOf",
    lastChildOf = "lastChildOf",
    elevate = "elevate"
}
type NoteWithoutTimeSTamps = Omit<Note, 'createdAt' | 'updatedAt'>;
export type NoteUpdate = Partial<NoteWithoutTimeSTamps> & Pick<Note, 'id'>;
export interface NoteResponse {
    note: Note;
}
export interface TreeNote extends Note {
    depth: number;
    prev?: string;
    children?: TreeNote[];
}
export interface ListNotesResponse {
    notes: TreeNote[];
}
export interface SuccessNoteResponse {
    success: boolean;
}
export interface DeleteNoteResponse {
    deleted: string[];
}
export interface UnsafeCreateNoteDto extends Omit<CreateNoteDto, 'userId'> {
    userId?: string;
}
export type UnsafeAddNoteTrigger = (newNote: UnsafeCreateNoteDto) => void;
export interface DetachedNote {
    sibling: Note | undefined;
    noteId: string;
    originalParent: string;
    originalNext: string;
    userId: string;
}
export interface DeleteNoteHandler {
    markedForDeletion: TreeNote | undefined;
    setMarkedForDeletion: Setter<TreeNote | undefined>;
}
export interface DraggedNotes {
    rowDragged: TreeNote | undefined;
    hoveredOver: TreeNote | undefined;
    moveType: MoveNotePosition | undefined;
    disabled: string[];
}
export type NewNoteToggle = string | 'ROOT_LAST' | 'ROOT_FIST' | undefined;
export interface AddNoteHandlers {
    addNote: UnsafeAddNoteTrigger;
    newNoteToggle: NewNoteToggle;
    setNewNoteToggle: Setter<NewNoteToggle>;
}
export interface UseDraggableHandler {
    handlers: DragHandlers;
    state: DraggedNotes;
    isDragged: boolean;
    isHovered: boolean;
    ancestorIsHovered: boolean;
    ref: RefObject<HTMLDivElement>;
    y: number;
}
export interface DragHandlers {
    zone: DragZoneHandler;
    row: DragRowHandlers;
    drag: DragWrapperHandlers;
}
export type DragZoneHandler = (moveType: MoveNotePosition) => {
    onMouseEnter: () => void;
};
export interface DragRowHandlers {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
export interface DragWrapperHandlers {
    onStart: DraggableEventHandler;
    onDrag: DraggableEventHandler;
    onStop: DraggableEventHandler;
}
export {};
//# sourceMappingURL=notes.interface.d.ts.map