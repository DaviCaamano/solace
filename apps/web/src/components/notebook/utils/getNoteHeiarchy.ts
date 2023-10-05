import { Note, LinkedNote } from '#interfaces/notes';

export const getNoteHeiarchy = (list: Note[]) => {
  return collectFamilies(list)?.[1];
};

/**
 * Go into the array of Notes and return an array of family trees of notes.
 * @param list - Note[]: A list of notes which will be emptied out as its notes are pushed to the heiarchy array
 * @param heiarchy - ParentNote[]: array of family trees of notes.
 *    Each Note can point to a parent
 *    as well as its next sibling in line which forms a linked-list.
 */
const collectFamilies = (list: Note[], heiarchy: LinkedNote[] = []): [Note[], LinkedNote[]] => {
  if (!list || list.length === 0) {
    return [[] as Note[], heiarchy];
  }
  const [notChildren, family] = getChildren(list[0], list);
  heiarchy.push(family);
  return collectFamilies(notChildren, heiarchy);
};

/**
 * Returns all descendants of provided Note.
 * @param parent - Note: The Parent of all descendants being returned
 * @param noteList - Note[]: A list of the user's notes
 */
const getChildren = (parent: Note, noteList: Note[]): [Note[], LinkedNote] => {
  let children: LinkedNote[] = [];

  let unrelated = noteList.filter((note: Note) => {
    const { id, parentId } = note;
    //Remove Parent from NoteList
    if (id !== parent.id) {
      return false;
      // Remove Direct descendant of Parent from Note List and store them in children array
    } else if (parentId === parent.id) {
      children.push(note);
      return false;
    }
    return true;
  });

  /** (Recursion) Get Next level of descendants in this family tree */
  children = children.map((child: Note): LinkedNote => {
    const [unrelatedToChild, childWithChildren] = getChildren(child, unrelated);
    unrelated = unrelatedToChild;
    return childWithChildren;
  });

  return [unrelated, { ...parent, children: sortChildren(children, parent.id) }];
};

/**
 * When multiple children are present, they should form a linked-list using their sibling id's.
 * The sibling without a sibling idd is first in order.
 * @param children - NoteParent[]: array of children in need of sorting
 * @param parentId - string: parent id for the purposes of reporting error.
 */
const sortChildren = (children: LinkedNote[] | undefined, parentId: string): LinkedNote[] => {
  if (!children || children.length === 0) {
    return [];
  }

  let [firstSibling, searching] = getFirstSibling(children, parentId);
  if (!firstSibling) {
    console.error('Failed to find first sibling of parent:', parentId);
    return [];
  }
  let sortedSiblings = [firstSibling];

  //Look through array of still searching children and find Note pointed to by the last member of the linked-list.
  let snapShot = 0;
  //Terminate Search if the list is broken by an unfound sibling.
  while (snapShot !== searching.length) {
    snapShot = searching.length;
    searching = searching.filter((child: LinkedNote) => {
      //Get Last member of linked-list
      const lastSibling = sortedSiblings[sortedSiblings.length - 1];
      if (lastSibling.id === child.siblingId) {
        //(Recursive) Sort Children of Child
        if (child.children) {
          child.children = sortChildren(child.children, parentId);
        }
        //Add child to end of linked-list and remove it from the array of searching siblings
        sortedSiblings.push(child);
        return false;
      }
      return true;
    });
  }

  //Report unsorted siblings
  if (searching.length) {
    console.error(
      `Failed to find position in linked-list of children for parent: [${parentId}], for the following ` +
        `children: [${searching.map(({ id }) => id).join(', ')}]`,
    );
  }

  searching.sort(
    ({ updatedAt: a }: LinkedNote, { updatedAt: b }: LinkedNote) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return [...sortedSiblings, ...searching];
};

/**
 * Get the first child in a linked-list of children notes,
 * return that child element and a list of its unsorted siblings
 * @param children - ParentNote[] - An unsorted linked list of Notes
 * @param parentId - string: the ID of the parent for error reporting.
 */
const getFirstSibling = (children: LinkedNote[], parentId: string): [LinkedNote | undefined, LinkedNote[]] => {
  let firstSibling: LinkedNote | undefined;
  children = children.filter((child: LinkedNote) => {
    if (child) {
      //There should be only one child with no sibling ID and that's the first sibling in the list of children
      if (!child.siblingId) {
        //Sort Children of Child
        if (child.children) {
          child.children = sortChildren(child.children, parentId);
        }
        //Add child to start of linked-list and remove it from the array of searching siblings
        firstSibling = child;
        return false;
      }
      return true;
    }
  });
  return [firstSibling, children];
};
