/**
 * instanceof 
 * @param {*} example 当前实例对象的原型
 * @param {*} classFunc 构造函数的原型 prototype
 * @returns 
 */
export const myInstanceof = (example, classFunc) => {
    let left = Object.getPrototypeOf(example);
    let right = classFunc.prototype;
  
    while (true) {
      if (left === null) return false

      // 在当前实例对象的原型链上，找到了当前类
      if (left === right) return true;

      // 沿着原型链__ptoto__一层一层向上查
      left = Object.getPrototypeOf(left);
    }
  
    return false;
  };