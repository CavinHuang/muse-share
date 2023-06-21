/**
 * 日期处理函数
 */

import { isArray, isDate, isFunction, isObject, isString } from "../is"
import { Lang, LangConfig, LangConfigItem, LangConfigType } from './lang'

/**
 * 初始化时间
 */
const initTime = [1970, 1, 1, 0, 0, 0, 0];
/**
 * 初始化单位
 */
const period = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millsecond",
] as const;

/**
 * 计算时差
 * @param date 
 * @param timeZone 
 * @returns 
 */
const convertTimeZone = (date: Date, timeZone: string) => {
  return new Date(date.toLocaleString("en-US", { timeZone }));
};

/**
 * 日期处理类
 */
export class MDate {
  /**
   * 静态方法 当前时间
   * @type Number
   */
  static now = Date.now

  _date!: Date

  _offset = 0

  _lang: Lang = "zh-CN"

  _langMap: LangConfigItem

  _timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone

  constructor (date: Date | string | number, options?: { lang: 'zh-CN' | 'en-US'; langMap?: LangConfigItem }) {
    
    this._date = new Date(date)
    this._lang = options?.lang || this._lang
    this._langMap = options?.langMap || LangConfig[this._lang]

    if (this._offset) {
      this._date.setTime(this._date.getTime() - this._offset);
    }
  }
  clone() {
    return new MDate(this.getTime());
  }
  getDate() {
    return this._date
  }
  getTime() {
    return this._date.getTime()
  }
  getUnix() {
    return ~~(this._date.getTime() / 1000);
  }
  toDate() {
    return this._date
  }
  toObject() {
    let _ = this._date;
    return {
      year: _.getFullYear(),
      month: _.getMonth() + 1,
      day: _.getDate(),
      hour: _.getHours(),
      minute: _.getMinutes(),
      second: _.getSeconds(),
      millsecond: _.getMilliseconds(),
      timestamp: _.getTime(),
      week: _.getDay(),
    };
  }
  toArray() {
    let $ = this.toObject();
    return period.map((name) => $[name]);
  }
  toString() {
    return this._date.toString();
  }
  toISOString() {
    return this._date.toISOString();
  }
  set(unit: (typeof period)[number] | 'timestamp' | 'week', value: number) {
    let _ = this._date;
    let $ = this.toObject();
    switch (unit) {
      case "year":
        _.setFullYear(value);
        break;
      case "month":
        _.setMonth(value - 1);
        break;
      case "day":
        _.setDate(value);
        break;
      case "hour":
        _.setHours(value);
        break;
      case "minute":
        _.setMinutes(value);
        break;
      case "second":
        _.setSeconds(value);
        break;
      case "millsecond":
        _.setMilliseconds(value);
        break;
      case "timestamp":
        _.setTime(value);
        break;
      case "week":
        _.setDate($.day - $.week + value);
        break;
    }
    return this;
  }
  get(unit: (typeof period)[number] | 'timestamp' | 'week') {
    let $ = this.toObject();
    return $[unit];
  }
  change(unit: (typeof period)[number]  | 'timestamp' | 'week', value: number) {
    let $ = this.toObject();
    return this.set(unit, $[unit] + value);
  }
  /**
   * 格式化时间
   * @param {string} pattern
   * @params {string} pattern.YY	18	两位数的年份
   * @params {string} pattern.YYYY	2018	四位数的年份
   * @params {string} pattern.M	1-12	月份，从 1 开始
   * @params {string} pattern.MM	01-12	月份，两位数
   * @params {string} pattern.MMM	1月-12月/Jan-Dec	缩写的月份名称
   * @params {string} pattern.MMMM	一月-十二月/January-December	完整的月份名称
   * @params {string} pattern.D	1-31	月份里的一天
   * @params {string} pattern.DD	01-31	月份里的一天，两位数
   * @params {string} pattern.H	0-23	小时
   * @params {string} pattern.HH	00-23	小时，两位数
   * @params {string} pattern.h	1-12	小时, 12 小时制
   * @params {string} pattern.hh	01-12	小时, 12 小时制, 两位数
   * @params {string} pattern.m	0-59	分钟
   * @params {string} pattern.mm	00-59	分钟，两位数
   * @params {string} pattern.s	0-59	秒
   * @params {string} pattern.ss	00-59	秒，两位数
   * @params {string} pattern.S	0-9	毫秒，一位数
   * @params {string} pattern.SS	00-99	毫秒，两位数
   * @params {string} pattern.SSS	000-999	毫秒，三位数
   * @params {string} pattern.Z	-05:00	UTC 的偏移量
   * @params {string} pattern.ZZ	-0500	UTC 的偏移量，两位数
   * @params {string} pattern.A	AM / PM	上午 下午 大写
   * @params {string} pattern.a	am / pm	上午 下午 小写
   * @params {string} pattern.W	0	0-6，分别表示星期日-星期六
   * @params {string} pattern.WW	周一	周x
   * @params {string} pattern.WWW	星期日	星期x
   * @params {string} pattern.Do	1st... 31st	带序数词的月份里的一天
   * @params {string} pattern.x	1410715640	Unix时间戳(秒)
   * @params {string} pattern.X	1410715640579	Unix时间戳(毫秒)
   * @returns 
   */
  format(pattern = "YYYY-MM-DD HH:mm:ss") {
    let that = this;
    let offset = this._offset;
    that._date.setTime(this._date.getTime() + offset);
    let _ = that._date;
    let $ = that.toObject();
    let match = _.toTimeString().match(/GMT([\+\-])(\d{2})(\d{2})/);
    if (match) {
      let map: {[k in string]: string | number} = {
        YYYY: "" + $.year,
        YY: ("" + $.year).padStart(2, "0"),
        MM: ("" + $.month).padStart(2, "0"),
        M: "" + $.month,
        DD: ("" + $.day).padStart(2, "0"),
        D: "" + $.day,
        HH: ("" + $.hour).padStart(2, "0"),
        H: "" + $.hour,
        hh: ("" + ($.hour % 12)).padStart(2, "0"),
        h: "" + ($.hour % 12),
        mm: ("" + $.minute).padStart(2, "0"),
        m: "" + $.minute,
        ss: ("" + $.second).padStart(2, "0"),
        s: "" + $.second,
        S: "" + ~~(($.millsecond % 1000) / 100),
        SS: "" + ~~(($.millsecond % 1000) / 10),
        SSS: "" + ($.millsecond % 1000),
        Z: match[1] + match[2] + ":" + match[3],
        ZZ: match[1] + match[2] + match[3],
        A: ["AM", "PM"][~~($.hour / 12)],
        a: ["am", "pm"][~~($.hour / 12)],
        X: $.timestamp,
        x: ~~($.timestamp / 1000),
        Q: "" + ~~($.month / 3),
        W: $.week,
      };
      let langMap = Object.assign({}, this._langMap);
      map["MMM"] = langMap["MMM"][$.month - 1];
      map["MMMM"] = langMap["MMMM"][$.month - 1];
      map["Do"] = langMap["Do"][$.day - 1];
      map["WW"] = langMap["WW"][$.week];
      map["WWW"] = langMap["WWW"][$.week];
      return pattern.replace(
        /Y+|M+|D+|H+|h+|m+|s+|S+|Z+|Do|A|a|X|x|Q|W+/g,
        (key) => {
          return map[key].toString() || "";
        }
      );
    }
    return ''
  }

  getInstance(that: any) {
    return that instanceof MDate ? that : new MDate(that);
  }

  /**
   * 获取某字段起始时
   * @param unit 
   * @returns 
   */
  startOf(unit: (typeof period)[number] | 'timestamp' | 'week') {
    let $ = this.toObject();
    let that = null;
    let index = period.indexOf(unit as unknown as any) + 1;
    let dateSet = this.toArray();
    let initSet = initTime.slice(index);
    dateSet.splice(index, initSet.length, ...initSet);
    if (unit == "timestamp") {
      that = this.clone();
    } else if (unit == "week") {
      that = mdate($.year, $.month, $.day - $.week, 0, 0, 0, 0);
    } else {
      that = mdate(...dateSet);
    }
    return that;
  }

  /**
   * 获取某字段末尾时
   * @param unit 
   * @returns 
   */
  endOf(unit: (typeof period)[number] | 'timestamp' | 'week') {
    return this.startOf(unit)
      .change(unit, unit == "week" ? 7 : 1)
      .change("millsecond", -1);
  }

  diffWith(that: MDate | string | Date | number, unit: (typeof period)[number]) {
    that = this.getInstance(that) as MDate;
    if (!that.isValid()) {
      return false;
    }
    let diffMap = {
      day: 8.64e7,
      hour: 3.6e6,
      minute: 6e4,
      second: 1000,
      millsecond: 1,
    } as const;
    let timestamp = this.getTime() - that.getTime();
    let value = 0;
    if (unit) {
      if ((diffMap as any)[unit]) {
        value = ~~(timestamp / (diffMap as any)[unit]);
      } else if (unit == "month") {
        let this_month = 12 * (this.get("year") - 1) + this.get("month");
        let that_month = 12 * (that.get("year") - 1) + that.get("month");
        value = this_month - that_month;
        if (value < 0 && this.get("day") > that.get("day")) {
          value += 1;
        } else if (value > 0 && this.get("day") < that.get("day")) {
          value -= 1;
        }
      } else if (unit == "year") {
        value = this.get("year") - that.get("year");
        if (
          value < 0 &&
          (this.get("month") > that.get("month") ||
            (this.get("month") == that.get("month") &&
              this.get("day") > that.get("day")))
        ) {
          value += 1;
        } else if (
          value > 0 &&
          (this.get("month") < that.get("month") ||
            (this.get("month") == that.get("month") &&
              this.get("day") < that.get("day")))
        ) {
          value -= 1;
        }
      }
      return value;
    } else {
      let clone = this.clone();
      let hash: {[k in (typeof period)[number]]?: number | boolean} = {};
      period.forEach(function (unit) {
        hash[unit] = clone.diffWith(that, unit) as unknown as number;
        clone.set(unit, (that as MDate).get(unit));
      });
      return hash;
    }
  }

  /**
   * 是否在某个时间点之前
   * @param that 
   * @param unit 
   * @returns 
   */
  isBefore(that: MDate | string | Date | number, unit: (typeof period)[number] | 'timestamp' | 'week' = "timestamp") {
    that = this.getInstance(that) as MDate;
    return this.get(unit) < that.get(unit);
  }
  /**
   * 是否在某个时间点之后
   * @param that 
   * @param unit 
   * @returns 
   */
  isAfter(that: MDate | string | Date | number, unit: (typeof period)[number] | 'timestamp' | 'week' = "timestamp") {
    that = this.getInstance(that);
    return this.get(unit) > that.get(unit);
  }

  /**
   * 是否和某个时间点相等
   * @param that 
   * @param unit 
   * @returns 
   */
  isSame(that: MDate | string | Date | number, unit: (typeof period)[number] | 'timestamp' | 'week' = "timestamp") {
    that = this.getInstance(that);
    return this.get(unit) == that.get(unit);
  }

  /**
   * 是否在两个时间点之间
   * @param startDate 
   * @param endDate 
   * @param unit 
   * @returns 
   */
  isBetween(
    startDate: MDate | string | Date | number, 
    endDate: MDate | string | Date | number, 
    unit:(typeof period)[number] | 'timestamp' | 'week' = "timestamp") 
    {
    startDate = this.getInstance(startDate);
    endDate = this.getInstance(endDate);
    return (
      this.get(unit) > startDate.get(unit) && this.get(unit) < endDate.get(unit)
    );
  }

  /**
   * 切换时区
   * @param timezone 
   * @returns 
   */
  switchTimezone(timezone: string) {
    this._timezone = timezone;
    this._offset =
      convertTimeZone(new Date("1970/1/1"), this._timezone).getTime() -
      new Date("1970/1/1").getTime();
    return this;
  }
  /**
   * 获取时区
   * @returns 
   */
  getTimezone() {
    return this._timezone;
  }
  /**
   * 获取当前时区与UTC的时间差(分钟)
   * @returns 
   */
  getTimezoneOffset() {
    return this._date.getTimezoneOffset() - (this._offset) / 60000;
  }
  /**
   * 是否是有效的时间
   * @returns 
   */
  isValid() {
    return !isNaN(this.getTime());
  }
}

/**
 * 函数调用
 * @param args 
 * @returns 
 */
export function mdate(...args: any[]) {
  let _date
  if (args.length) {
    if (isDate(args[0])) {
      _date = args[0]
    } else {
      // new MDate([2018,8,8,8,8,0])
      if (isArray(args[0])) {
        args = initTime.map((value, index) => args[0][index] || value)
      } else if (isObject(args[0])){
        // new MDate({year:2008,month:8,day:8,hour:8,minute:0,second:0})
        args = initTime.map((value, index) => args[0][period[index]] || value)
      }
      if (args.length === 1 && isString(args[0])) {
        let matchs1 = args[0].match(
          /(\d{1,4})[\-\/](\d{1,2})[\-\/](\d{1,2})([\sT](\d{1,2})?:(\d{1,2})?(:(\d{1,2}))?(\.(\d{1,3}))?)?/
        );
        let matchs2 = args[0].match(
          /(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{3,4})([\sT](\d{1,2})?:(\d{1,2})?(:(\d{1,2}))?(\.(\d{1,3}))?)?/
        );
        let matchs3 = args[0].match(
          /^([12]\d{3})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?(\d{1,3})?/
        );
        if (matchs1 && !matchs2) {
          args = [1, 2, 3, 5, 6, 8, 10].map(function (i, index) {
            return +(matchs1![i] || initTime[index]);
          });
        } else if (matchs2) {
          args = [3, 1, 2, 5, 6, 8, 10].map(function (i, index) {
            return +(matchs2![i] || initTime[index]);
          });
        } else if (matchs3) {
          args = [1, 2, 3, 4, 5, 6, 7].map(function (i, index) {
            return +(matchs3![i] || initTime[index]);
          });
        }
      }
      if (args.length >= 3) {
        args[1]--;
      }
      _date = new Date(...args as []);
      if (args.length >= 2 && !isNaN(args[0]) && args[0] < 100) {
        _date.setFullYear(args[0]);
      }
    }
    
  } else {
    _date = new Date()
  }
  return new MDate(_date)
}