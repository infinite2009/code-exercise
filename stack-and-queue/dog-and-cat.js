/*
 * @file 猫狗队列
 *
 * 里边同时有猫有狗，既能 poll 所有的狗，又能 poll 所有的猫，同时还能 poll所有动物
 *
 * 思路，用三个队列来维护，每次操作 dog 队列 或者 cat 队列时，都要同步操作 whole 队列，操作 whole 队列时，根据元素类型，操作对应的队列
 *
 * 改进方法：构建一个新的类，组合序号这个属性，仅用两个队列，pollAll 时，应用类似归并排序的做法，哪个队列的对头元素序号考前，就从哪个队列 poll
 */

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  getPetType() {
    return this.type;
  }
}

class Dog extends Pet {
  constructor(name) {
    super('dog', name);
  }
}

class Cat extends Pet {
  constructor(name) {
    super('cat', name);
  }
}

class CatAndDogQueue {
  constructor(size) {
    this.wholeStack = [];
    this.catStack = [];
    this.dogStack = [];
    this.size = size;
  }

  // 依次拉取所有的元素
  pollAll() {
    while(this.wholeStack.length) {
      const el = this.wholeStack.shift();
      if (el.type === 'dog') {
        this.dogStack.shift();
      }
      if (el.type === 'cat') {
        this.catStack.shift();
      }
      console.log('pollAll: ', el);
    }
  }

  // 依次拉取所有的猫
  pollCat() {
    while(this.catStack.length) {
      const el = this.catStack.shift();
      this.wholeStack.shift();
      console.log('poll cat: ', el);
    }
  }

  // 依次拉取所有的狗
  pollDog() {
    while(this.dogStack.length) {
      const el = this.dogStack.shift();
      this.wholeStack.shift();
      console.log('poll dog: ', el);
    }
  }

  isEmpty() {
    return this.wholeStack.length === 0;
  }

  isDogEmpty() {
    return this.dogStack.length === 0;
  }

  isCatEmpty() {
    return this.catStack.length === 0;
  }

  add(el) {
    this.wholeStack.push(el);
    if (el.type === 'dog') {
      this.dogStack.push(el);
    }
    if (el.type === 'cat') {
      this.catStack.push(el);
    }
  }
}

function test() {
  const stack = new CatAndDogQueue(10);
  const arr = [new Dog('Luke'), new Cat('Jimmy'), new Dog('Dolly'), new Cat('Puck'), new Dog('Sarah'), new Cat('Andrew'), new Dog('Dick'), new Cat('Patrick')];
  arr.forEach((item) => {
    stack.add(item);
  });
  // 拉取所有的元素
  // stack.pollAll();
  // console.log('after poll all: ', stack);
  console.log('before polling dog: ', stack.isEmpty());
  console.log('before polling dog: ', stack.isDogEmpty());
  stack.pollDog();
  console.log('after polling dog: ', stack.isDogEmpty());
  console.log('after polling dog: ', stack.isEmpty());


  console.log('before polling cat: ', stack.isEmpty());
  console.log('before polling cat: ', stack.isCatEmpty());
  stack.pollCat();
  console.log('after polling cat: ', stack.isCatEmpty());
  console.log('after polling cat: ', stack.isEmpty());

}

test();
