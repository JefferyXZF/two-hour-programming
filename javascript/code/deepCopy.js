
const isObject = value => (typeof value === 'object' || typeof value === 'function') && value !== null

const numberTag = '[object Number]'
const stringTag = '[object String]'
const booleanTag = '[object Boolean]'
const symbolTag = '[object Symbol]'
const bigintTag = '[object BigInt]'
const regTag = '[object RegExp]'
const funcTag = '[object Function]'
const setTag = '[object Set]'
const mapTag = '[object Map]'

const canTranse = {
  '[object Object]': true,
  '[object Array]': true,
  '[object Set]': true,
  '[object Map]': true,
  '[object Arguments]': true,
}

const handleNotTranse = (target, type) => {
    const Ctro = target.constructor

    switch(type) {
        case numberTag:
          return new Object(Number.prototype.valueOf.call(target))
        case stringTag:
          return new Object(String.prototype.valueOf.call(target))
        case booleanTag:
          return new Object(Boolean.prototype.valueOf.call(target))
        case symbolTag:
          return new Object(Symbol.prototype.valueOf.call(target))
        case bigintTag:
          return new Object(BigInt.prototype.valueOf.call(target))
        case regTag:
          const { source, flags } = target
          return new Ctro(source, flags)
        case funcTag:
          return target
        default:
          return new Ctro()

    }
}

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null

export const deepCopy = (target, map = new WeakMap) => {
  if (!isObject(target)) return target

  const typeTag = Object.prototype.toString.call(target)

  // 不可遍历对象
  if (!canTranse[typeTag]) return handleNotTranse(target, typeTag)

  //  解决循环引用
  if (map.get(target)) return target

  map.set(target, true)

  const copyTarget = new target.constructor()

  // set
  if (typeTag === setTag) {
    target.forEach(element => {
      copyTarget.add(deepCopy(element, map))
    });

    return copyTarget
  }

  // map
  if (typeTag === mapTag) {
    target.forEach((element, key) => {
      copyTarget.set(deepCopy(key, map), deepCopy(element, map))
    });

    return copyTarget
  }

  // object, array, arguments
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      copyTarget[key] = deepCopy(target[key], map)
    }
  }

  return copyTarget
}