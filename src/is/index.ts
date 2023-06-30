/**
 * 类型判断
 */
const prototype = Object.prototype
enum normalType {
 String = 'String',
 Number = 'Number',
 Function = 'Function',
 Date = 'Date',
 Object = 'Object',
 Null = 'Null',
 Map = 'Map',
 Set = 'Set',
 RegExp = 'RegExp'
}
/**
 * object to string
 */
export const objectToString = prototype.toString

/**
 * 获取type
 * @param value 
 * @returns 
 */
export const toTypeString = (value: unknown): string => objectToString.call(value)

/**
 * 是不是某个type
 * @param { any } val - 待判断的值 
 * @param { normalType } type - 类型
 * @returns 
 */
const isType = (val: unknown, type: normalType) => toTypeString(val) === `[object ${type}]`

/**
 * 是否是字符串
 * @param { any } val - 检测值 
 * @returns { boolean } - 是否是字符串
 */
export const isString = (val: unknown): val is string => isType(val, normalType.String);

/**
 * 是否是日期对象
 * @param { any } val - 检测值 
 * @returns { boolean } - 是否是日期对象
 */
export const isDate = (val: unknown): val is Date => isType(val, normalType.Date)

/**
 * 是否是数字
 * @param { any } val - 检测值 
 * @returns { boolean } - 是否是数字
 */
export const isNumber = (val: unknown): val is Date => isType(val, normalType.Number)

/**
 * 是否是null
 * @param { any } val - 检测值 
 * @returns { boolean } - 是否是null
 */
export const isNull = (val: unknown): val is Date => isType(val, normalType.Null)


/**
 * 是否是函数
 * @param { any } val - 检测值 
 * @returns { boolean } - 是否是函数
 */
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * 是否是数组
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是数组
 */
export const isArray = <T = any>(val: unknown): val is Array<T> => Array.isArray(val)

/**
 * 是否是map
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是map
 */
export const isMap =(val: unknown): val is Map<any, any> => isType(val, normalType.Map)

/**
 * 是否是set
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是set
 */
export const isSet =(val: unknown): val is Set<any> => isType(val, normalType.Set)

/**
 * 是否是正则表达式
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是正则表达式
 */
export const isRegExp =(val: unknown): val is RegExp => isType(val, normalType.RegExp)

/**
 * 是否是symbol
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是symbol
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

/**
 * 是否是object
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是object
 */
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

/**
 * 是否是object
 * @param val 
 * @returns 
 */
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'

/**
 * 是否是promise
 * @param { any } val - 检测值  
 * @returns { boolean } - 是否是promise
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => isObject(val) && isFunction(val.then) && isFunction(val.catch)

/**
 * 是否是整数
 * @param { any } val - 检测值  
 * @returns 
 */
export const isIntegerKey = (key: unknown) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key

/**
 * 是否是空的
 * @param { any } val - 检测值  
 * @returns { boolean }
 */
export const isEmpty = (val: unknown) => {
  if (isArray(val) || isString(val)) return val.length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  if (isMap(val) || isSet(val)) return val.size === 0
  return Boolean(val)
}