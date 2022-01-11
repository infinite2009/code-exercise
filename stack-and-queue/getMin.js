/*
 * @file 实现
 */


 export class MinStack {
   constructor() {
     this.stack = [];
     this.top = null;
   }

   push(num) {
     // 如果新push的值更小
     if (this.top < num) {

     }
     this.stack.push();
   }

   pop() {
    this.stack.pop();
   }

   getMin() {
     return top;
   }
 }