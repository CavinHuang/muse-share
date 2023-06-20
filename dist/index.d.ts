/**
 * 是否是字符串
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是字符串
 */
declare const isString: (val: unknown) => val is string;
/**
 * 是否是日期对象
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是日期对象
 */
declare const isDate: (val: unknown) => val is Date;
/**
 * 是否是数字
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是数字
 */
declare const isNumber: (val: unknown) => val is Date;
/**
 * 是否是null
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是null
 */
declare const isNull: (val: unknown) => val is Date;
/**
 * 是否是数组
 * @param { any } val - 检测值
 * @returns { boolean } - 是否是数组
 */
declare const isArray: <T = any>(val: unknown) => val is T[];

export { isArray, isDate, isNull, isNumber, isString };
