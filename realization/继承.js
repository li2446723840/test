// // 创建对象
// // 1、工厂模式
// const createObj = function (name, age) {
//   const obj = new Object();
//   obj.name = name;
//   obj.age = age;
//   obj.sayName = function () {
//     console.log(1111);
//   };
//   return obj;
// };
// const obj1 = createObj("张三", 12);
// console.log(obj1, "obj1");
// // 2、构造函数模式
// function Person1(name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayName = function () {
//     console.log(111);
//   };
// }
// const obj2 = new Person1("张三", 12);
// console.log(obj2, "obj2");
// // 3、原型模式
// function Person2(name,age) {
//   Person2.prototype.name = name;
//   Person2.prototype.age = age;
//   Person2.prototype.sayName = function() {
//     console.log(1111);
//   }
// }
// const obj3 = new Person2("张三", 43);

// --------------------------------------------------------------------------------------

// 1、原型链继承
// function SuperType() {
//   this.sayName = function() {
//     console.log(1111);
//   }
// }
// function SubType() {}
// SubType.prototype = new SuperType();
// const aa = new SubType();
// aa.sayName();

// 2、经典继承(盗用构造函数)
// function SuperType() {
//   this.sayName = function () {
//     console.log(222);
//   };
// }
// function SubType() {
//   SuperType.apply(this);
// }
// const aa = new SubType();
// aa.sayName();

// 3、组合继承(原型链继承 + 经典继承)
// function SuperType(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
// }
// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// };
// function SubType(name, age) {
//   // 继承属性
//   SuperType.call(this, name);
//   this.age = age;
// }
// // 继承方法
// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// };

// 4、原型式继承(Object.create())
// function myCreate(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }
// let person = {
//   name: "Nicholas",
//   friends: ["Shelby", "Court", "Van"]
// };
// myCreate(person);

// 5、寄生式继承
// function createAnother(original) {
//   let clone = object(original); // 通过调用函数创建一个新对象
//   clone.sayHi = function () {
//     // 以某种方式增强这个对象
//     console.log("hi");
//   };
//   return clone; // 返回这个对象
// }
// let person = {
//   name: "Nicholas",
//   friends: ["Shelby", "Court", "Van"]
// };
// function createAnother(original) {
//   let clone = createAnother(original); // 通过调用函数创建一个新对象
//   clone.sayHi = function () {
//     // 以某种方式增强这个对象
//     console.log("hi");
//   };
//   return clone; // 返回这个对象
// }
// createAnother(person);
// 6、寄生式组合继承(是引用类型继承的最佳模式)
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
