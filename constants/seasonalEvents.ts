
/**
 * HanziMaster v0.4.1
 * 节庆与时令事件定义
 */

export interface SeasonalEvent {
  name: string;
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  keywords: string[];
}

// 注意：这里使用的是公历近似日期，未来可接入农历算法库以获得更精确的日期
export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    name: "New Year & Spring Festival Season",
    startMonth: 1, startDay: 1,
    endMonth: 2, endDay: 20,
    keywords: ["春节", "恭喜发财", "福", "红包", "团圆", "新年快乐", "年年有余"]
  },
  {
    name: "Lantern Festival",
    startMonth: 2, startDay: 21,
    endMonth: 2, endDay: 28,
    keywords: ["元宵", "灯谜", "团圆"]
  },
  {
    name: "Qingming Festival",
    startMonth: 4, startDay: 1,
    endMonth: 4, endDay: 10,
    keywords: ["清明", "踏青", "纪念"]
  },
  {
    name: "Labor Day",
    startMonth: 4, startDay: 28,
    endMonth: 5, endDay: 5,
    keywords: ["劳动", "光荣", "休息"]
  },
  {
    name: "Dragon Boat Festival",
    startMonth: 6, startDay: 1,
    endMonth: 6, endDay: 20,
    keywords: ["端午", "龙舟", "粽子", "屈原"]
  },
  {
    name: "Qixi Festival (Chinese Valentine's)",
    startMonth: 8, startDay: 1,
    endMonth: 8, endDay: 15,
    keywords: ["七夕", "爱情", "喜鹊"]
  },
  {
    name: "Mid-Autumn Festival",
    startMonth: 9, startDay: 10,
    endMonth: 10, endDay: 5,
    keywords: ["中秋", "月饼", "赏月", "团圆", "思念"]
  },
  {
    name: "National Day",
    startMonth: 10, startDay: 1,
    endMonth: 10, endDay: 7,
    keywords: ["国庆", "祖国", "繁荣", "和平"]
  },
  {
    name: "Single's Day",
    startMonth: 11, startDay: 10,
    endMonth: 11, endDay: 12,
    keywords: ["光棍", "购物", "快乐"]
  },
  {
    name: "Christmas Season",
    startMonth: 12, startDay: 20,
    endMonth: 12, endDay: 26,
    keywords: ["圣诞", "礼物", "平安"]
  }
];
