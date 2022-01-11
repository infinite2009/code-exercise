/*
 * @file 删除倒数第 k 个
 *
 * 思路：遍历到第 K 个，开始计数，不断更新 toDelete
 */

function deleteLastKSingle(head, k) {
  if (!head) {
    return null;
  }

  let cur = head;
  let toDelete = null;
  let prev = null;
  let toDeletePrev = null;
  let count = 0;
  while (cur) {
    // 说明当前节点是第一个可能被删除的候选节点
    if (count === k - 1) {
      toDelete = cur;
      toDeletePrev = prev;
    } else if (count > k - 1) {
      toDeletePrev = toDelete;
      toDelete = toDelete.next;
    }
    prev = cur;
    cur = cur.next;
    count++;
  }
  if (!toDelete) {
    return toDelete;
  }
  // 删除节点
  if (toDeletePrev && toDelete) {
    toDeletePrev.next = toDelete.next;
    return toDelete;
  } else if (toDeletePrev === null) {
    // toDeletePrev 为 null, 说明删的是队头
    head = head.next;
  }

}

function test() {
  const head = null;
  const deleted = deleteLastKSingle(head, 5);
}

test();