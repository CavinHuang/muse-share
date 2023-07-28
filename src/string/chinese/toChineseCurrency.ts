import { assignObject } from '../../object'
import { CN_NUMBER_BIG_DIGITS, CN_NUMBER_DIGITS } from './constants'
import { toChineseNumber } from './toChineseNumber'

export interface ToChineseCurrencyOptions {
  big?: boolean // 是否大写
  prefix?: string // 前缀
  unit?: string // 单位
  suffix?: string // 后缀
}
/**
 * 转换为中文大写货币
 * @param {*} value
 */
export function toChineseCurrency(value: number | string, options?: ToChineseCurrencyOptions): string {
  const { big, prefix, unit, suffix } = assignObject({
    big: false,
    prefix: '',
    unit: '元',
    suffix: '',
  }, options)
  const [wholeValue, decimalValue] = String(value).split('.')
  let result
  if (big)
    result = toChineseNumber(wholeValue, true) + unit
  else
    result = toChineseNumber(wholeValue) + unit

  if (decimalValue) {
    if (decimalValue[0]) {
      const bit0 = Number.parseInt(decimalValue[0])
      result = `${result + (big ? CN_NUMBER_BIG_DIGITS[bit0] : CN_NUMBER_DIGITS[bit0])}角`
    }
    if (decimalValue[1]) {
      const bit1 = Number.parseInt(decimalValue[1])
      result = `${result + (big ? CN_NUMBER_BIG_DIGITS[bit1] : CN_NUMBER_DIGITS[bit1])}分`
    }
  }
  return prefix + result + suffix
}
