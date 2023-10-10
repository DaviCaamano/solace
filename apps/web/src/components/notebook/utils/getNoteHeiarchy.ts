import { TreeNote } from '#interfaces/notes';
import { arrayInsert } from '#utils/array';

/**
 * Organize the Semi-sorted list of Notes from the backend's list endpoint into a tree heiarchy.
 * @param list - TreeNote[]: a semi-sorted list of notes.
 *  This array is expected to be sorted by level of depth, but children nodes do not have a position relative to their
 *    parent node. By the time this function is complete. All nodes should be sorted into an array of root nodes
 *    with their ancestors nested in each generation's "children" property.
 */
export const getNoteHeiarchy = (list: TreeNote[]): TreeNote[] => {
  const levels = breakIntoLevels(list);
  const tree = [...levels[0]];
  return tree.map((parent: TreeNote) => {
    return getChildren(parent, levels)[0];
  });
};

/**
 * Break the flat list of nodes into a matrix.
 * Nodes are placed on a depth equal to their node['depth'] value.
 * @param list - Flat list of Nodes
 */
const breakIntoLevels = (list: TreeNote[]): TreeNote[][] => {
  const levels: TreeNote[][] = [];

  for (let node of list) {
    if (typeof node.depth === 'undefined') {
      continue;
    }

    if (typeof levels?.[node.depth] === 'undefined') {
      levels[node.depth] = [{ ...node }];
    } else {
      levels[node.depth].push({ ...node });
    }
  }

  return levels;
};

/**
 * A recursive function that inserts the next generation of ancestors into each generation's "children" property.
 * @param parent - TreeNote: The root node whose family tree is being assembled
 * @param levels - TreeNote[][]: A matrix of nodes where the first dimension represents an array of nodes with a
 *   specific depth
 *    ie: TreeNote[0] has all the node['depth'] === 0 nodes.
 */
const getChildren = (parent: TreeNote, levels: TreeNote[][]): [TreeNote, TreeNote[][]] => {
  if (parent.depth + 1 >= levels.length) {
    return [parent, levels];
  }
  const nextLevel = levels[parent.depth + 1];
  levels[parent.depth + 1] = nextLevel.filter((child: TreeNote) => {
    if (child.parentId === parent.id) {
      if (typeof parent.children === 'undefined') {
        parent.children = [child];
      } else {
        parent.children.push(child);
      }
      return false;
    }
    return true;
  });

  let sortedChildren = [];

  /**
   * Get the Ancestors then insert them at the appropriate index.
   */
  if (parent.children) {
    for (let index = 0; index < parent.children?.length; index++) {
      const [childWithChildren, filteredLevels] = getChildren(parent.children[index], levels);
      levels = filteredLevels;
      insertChild(childWithChildren, sortedChildren);
    }
  }

  return [parent, levels];
};

/**
 * Insert a child after the node with a "next" property matching that node's ID.
 * if none are present, the node is moved to the back of the array.
 * @param child - TreeNode: Target Node being inserted
 * @param array - TreeNode[]: An unsorted or sort-in-progress array of other nodes with the same depth.
 */
const insertChild = (child: TreeNote, array: TreeNote[]) => {
  if (!array?.length) {
    arrayInsert(array, 0, child);
    return;
  }

  for (let index = 0; index < array.length; index++) {
    const nextId = array[index].next;
    if (nextId && child.id === nextId) {
      arrayInsert(array, index + 1, child);
      return;
    }
  }
  arrayInsert(array, array.length, child);
};