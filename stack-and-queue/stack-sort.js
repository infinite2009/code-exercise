/*
 * @file 用栈给另外一个栈排序（从栈顶到栈底，从大到小），仅能使用一个栈，可以使用临时变量，但是不能再使用其他数据结构。
 *
 * 思路1：用递归地方式在临时栈中构建从小到大的栈，然后再倒入原始栈
 *
 * 思路2：每次弹出一个元素，然后比较临时栈的栈顶，如果弹出元素较小，直接压入临时栈，否则，则一直弹出临时栈，并将弹出的元素压入原始栈，直到临时栈顶的元素较大为止
 */

function stackSort(stack) {
  const tempStack = []
  while (stack.length) {
    const top = stack.pop();
    insert(tempStack, top);
    console.log('after inserting: ', tempStack);
  }
  // 倒回去
  while (tempStack.length) {
    stack.push(tempStack.pop());
  }
}

function insert(stack, item) {
  // 如果是空栈、直接压入
  if (stack.length === 0) {
    stack.push(item);
    return;
  }
  const top = stack.pop();
  if (top > item) {
    stack.push(top);
    stack.push(item);
  } else {
    // top 不大于 item，则需要递归调用了
    insert(stack, item);
    stack.push(top);
  }
}

function test() {
  const stack = [3, 2, 1, 5, 4];
  console.log('before sorting: ', stack);
  stackSort(stack);
  console.log('after sorting: ', stack);
}

test();
