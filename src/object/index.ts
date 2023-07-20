import { Key } from '../types'

export * from './assign'

/**
 * 该函数检查给定对象中是否存在给定键并返回布尔值。
 * @public
 * @param key - 第一个参数“key”的类型为“Key”，它可能是表示对象属性键的字符串或符号。
 * @param obj - `obj` 参数是类型为 `T` 的对象，它是扩展了 `object` 类型的泛型。这意味着 `obj` 可以是任何具有属性和方法的对象。
 * @returns 一个布尔值，指示提供的键是否存在于提供的对象的键中。
 */
export function keyIn<T extends object>(key: Key, obj: T): key is keyof T {
  return key in obj
}