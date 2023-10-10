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

  const tree = sortList([...levels[0]]);
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

  /** Sort the Nodes on Each Level */
  return levels;
};

const sortList = (list: TreeNote[]) => {
  let endNode: TreeNote | undefined;
  const endLessList = list.filter((node: TreeNote) => {
    if (!node) {
      return false;
    }
    if (!node.next) {
      endNode = node;
      return false;
    }
    return true;
  });

  return [...sort(endLessList.map((node) => [node])), endNode];
};
/**
 * Sort a flat single direction linked list without pointers (id by string)
 * O(NLogN);
 * */
const sort = (list: TreeNote[][], max: number = 0, iter: number = 0) => {
  if (!max) {
    max = list.length * 2 + 1;
  }
  if (iter > 50) {
    return list;
  }
  if (!list) {
    return [];
  }
  if (list.length === 1) {
    return list[0];
  }

  //Turn the array into an array of sublists.

  for (let i = 0; i < list.length; i++) {
    //Last element in outer loop's sub-list
    const outer: TreeNote = list[i][list[i].length - 1];

    for (let j = 0; j < list.length; j++) {
      //Do not evaluate the same index against itself
      if (i === j) {
        continue;
      }
      //First element in inner loop's sublist
      const inner: TreeNote = list[j][0];

      //If one sub-list's points to the start the second sub-list
      if (outer.next === inner.id) {
        //Append the second sublist to the first sublist, remove from second sublist

        list[i] = list[i].concat(...list[j]);
        list.splice(j, 1);
        //If you removed an index before i, reduce i by 1 to avoid jumping forward on the outer loop
        j < i && i--;
        //Reduce j by 1 to avoid jumping forward on the inner loop
        j--;
      }
    }
  }
  return sort(list, max, ++iter);
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
    parent.children = sortList(parent.children);
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
