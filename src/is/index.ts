import type { RgbColor } from '../types'

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
  RegExp = 'RegExp',
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
export const isString = (val: unknown): val is string => isType(val, normalType.String)

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
export const isNumber = (val: unknown): val is number => isType(val, normalType.Number)

/**
 * 是否是null
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是null
 */
export const isNull = (val: unknown): val is Date => isType(val, normalType.Null)

/**
 * 该函数检查给定值是否未定义。
 * @public
 * @param u - 参数“u”的类型为“any”，这意味着它可以是任何数据类型（字符串、数字、布尔值、对象等）。
 * @returns 函数 is_undefined 返回一个布尔值，指示输入参数 u 是否为 undefined 。
 */
export function isUndefined(u: any): u is undefined {
  return u === undefined
}

/**
 * 该函数检查给定值是否为 null 或 undefined，或者它是否为 NaN 的数字。
 * @public
 * @param t - 参数 `t` 是 `any` 类型，这意味着它可以是任何数据类型。
 * @returns 一个布尔值，指示输入参数“t”是否“null”或“undefined”。
 */
export function isVoid(t: any): t is null | undefined {
  if (typeof t === 'number')
    return Number.isNaN(t)

  return isNull(t) || isUndefined(t)
}

/**
 * 是否是函数
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是函数
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * 是否是数组
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是数组
 */
export const isArray = <T = any>(val: unknown): val is Array<T> => Array.isArray(val)

/**
 * 是否是boolean
 * @param val
 * @returns
 */
export const isBoolean = function (val: unknown): val is boolean {
  return typeof val === 'boolean'
}

/**
 * 是否是map
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是map
 */
export const isMap = (val: unknown): val is Map<any, any> => isType(val, normalType.Map)

/**
 * 是否是set
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是set
 */
export const isSet = (val: unknown): val is Set<any> => isType(val, normalType.Set)

/**
 * 是否是正则表达式
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是正则表达式
 */
export const isRegExp = (val: unknown): val is RegExp => isType(val, normalType.RegExp)

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
export function isIntegerKey(key: unknown) {
  return isString(key)
  && key !== 'NaN'
  && key[0] !== '-'
  && `${Number.parseInt(key, 10)}` === key
}

/**
 * 是否是空的
 * @param { any } val - 检测值
 * @returns { boolean }
 */
export function isEmpty(val: unknown) {
  if (isArray(val) || isString(val))
    return val.length === 0
  if (isObject(val))
    return Object.keys(val).length === 0
  if (isMap(val) || isSet(val))
    return val.size === 0
  return Boolean(val)
}
/**
 * 该函数检查给定字符串是否是具有可选数据 URI 方案的有效 base64 编码字符串。
 * @public
 * @param str - 表示数据 URI 方案的字符串，它可能是也可能不是 base64 编码的。
 * @returns 函数 isBase64 将字符串作为输入并返回一个布尔值，指示该字符串是否是有效的 base64 编码字符串。该函数使用正则表达式检查输入字符串是否与 base64
 * 编码字符串的模式匹配。如果输入字符串与模式匹配，则函数返回“true”，否则返回“false”。
 */
export function isBase64(str: string): str is string {
  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==$/i.test(str)
}

/**
* 该函数检查给定对象是否是 Blob 类的实例。
* @public
* @param blob - 可以是任何数据类型。
* @returns 函数 isBlob 返回一个布尔值，指示输入参数 blob 是否是 Blob 类的实例。
*/
export function isBlob(blob: any): blob is Blob {
  return blob instanceof Blob
}

/**
* 该函数检查给定对象是否是 File 类的实例。
* @public
* @param file - 可以是任何数据类型。
* @returns 函数 isFile 返回一个布尔值，指示输入的 file 是否是 File 类的实例。如果输入是一个 File 对象，它返回 true ，否则返回 false 。
*/
export function isFile(file: any): file is File {
  return file instanceof File
}

/**
* 该函数检查给定目标是字符串还是数字。
* @public
* @param target - 参数 `target` 是 `any` 类型，这意味着它可以是任何数据类型。
* @returns 函数 is_string_like 返回一个布尔值。如果 `target` 参数是字符串或数字，则返回 `true`，否则返回 `false`。使用 typeof 运算符检查
* target 参数以确定它是字符串还是数字，并且 isFinite 函数用于排除不是有限数字的值（例如
*/
export function isStringLike(target: any): target is string | number {
  return isNumber(target) || typeof target === 'string'
}

/**
* 该函数检查给定字符串是否全是汉字，范围为 [0x4e00, 0x9fa5]。
* @public
* @param str - 参数 `str` 是 `any` 类型，这意味着它可以是任何数据类型
* @returns 函数 is_chinese 返回一个布尔值，指示输入的 str 是否全是汉字，范围为 [0x4e00, 0x9fa5]。
*/
export function isChinese(str: string): boolean {
  return /^[\u4E00-\u9FA5]+$/.test(str)
}

/**
* 函数正在检查给定的字符串是否是有效的电子邮件地址。它使用正则表达式将字符串与有效电子邮件地址的模式进行匹配。
* 如果字符串与模式匹配，则函数返回“true”，表明它是有效的电子邮件地址。否则，它返回“false”。
* @public
* @param str - 参数 `str` 是 `any` 类型，这意味着它可以是任何数据类型
* @returns 函数 is_email 返回一个布尔值，指示输入的 str 是否是有效的电子邮件地址。
*/
export function isEmail(str: string): boolean {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
}

/**
 * 该函数检查给定颜色是否为 RGB 颜色。
 * @public
 * @param color - 它可以是任何数据类型。
 * @returns 返回一个布尔值。
 */
export function isRgbColor(color: any): color is RgbColor {
  if (!Array.isArray(color))
    return false
  return (color.length === 4 || color.length === 3) && color.every((v, i) => {
    if (i === 3)
      return Number(v) <= 1

    else
      return Number(v) <= 255
  })
}

/**
* 该函数检查给定的字符串是否是有效的十六进制颜色代码。
* @public
* @param color - 参数“color”是一个字符串，表示十六进制格式的颜色值。它可以有一个可选的“#”符号开头，后跟 3 到 8 个字符，可以是数字 (0-9)
* 或字母（a-f 或 A-F）。
* @returns 函数 is_hex_color 返回一个布尔值，指示输入的 color
* 是否是有效的十六进制颜色代码。
*/
export function isHexColor(color: string) {
  return color.match(/^#?[0-9a-fA-F]{3,8}$/) !== null
}

/**
* 该函数检查给定参数是否是 TypeScript 中的全局窗口对象。
* @public
* @param win - 可以是任何数据类型。
* @returns 函数 is_window 返回一个布尔值，指示 win 参数是否与全局 window 对象相同。
*/
export function isWindow(win: any): win is Window {
  return win === window
}

/**
* 该函数检查给定对象是否是 TypeScript 中 Element 类的实例。
* @public
* @param el - 可以是任何数据类型。
* @returns 函数 is_element 返回一个布尔值，指示输入的 el 是否是 Element 类的实例。
*/
export function isElement(el: any): el is Element {
  return el instanceof Element
}
