/**
 * 默认语言配置
 */
export type Lang = 'en-US' | 'zh-CN'
export interface LangConfigItem {
  MMM: Array<string>;
  MMMM: Array<string>;
  Do: Array<string>;
  WW: Array<string>;
  WWW: Array<string>;
}
export type LangConfigType = Record<Lang, LangConfigItem>
export const LangConfig: LangConfigType= {
  'en-US': {
    'MMM':['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
    'MMMM':['January','February','March','April','May','June','July','August','September','October','November','December'],
    'Do':['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st'],
    'WW':['Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.'],
    'WWW':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  },
  'zh-CN': {
    'MMM':['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    'MMMM':['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    'Do':['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日'],
    'WW':['周日','周一','周二','周三','周四','周五','周六'],
    'WWW':['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  }
}