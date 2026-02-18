// app/constants/seasonalEvents.ts v1.0.1
import { SeasonalEvent } from '../types';

export { type SeasonalEvent };

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  { name: "springFestival", startMonth: 1, startDay: 15, endMonth: 2, endDay: 20, keywords: ["春节", "福", "红包", "新年", "团圆", "饺子", "灯笼", "春联"] },
  { name: "lanternFestival", startMonth: 2, startDay: 21, endMonth: 3, endDay: 5, keywords: ["元宵", "灯谜", "花灯", "汤圆"] },
  { name: "qingming", startMonth: 4, startDay: 1, endMonth: 4, endDay: 10, keywords: ["清明", "踏青", "风筝", "柳树", "纪念"] },
  { name: "laborDay", startMonth: 5, startDay: 1, endMonth: 5, endDay: 5, keywords: ["劳动", "休息", "光荣", "旅行"] },
  { name: "dragonBoat", startMonth: 6, startDay: 1, endMonth: 6, endDay: 15, keywords: ["端午", "粽子", "龙舟", "屈原", "艾草"] },
  { name: "qixi", startMonth: 8, startDay: 1, endMonth: 8, endDay: 15, keywords: ["七夕", "爱情", "鹊桥", "牛郎", "织女"] },
  { name: "midAutumn", startMonth: 9, startDay: 10, endMonth: 10, endDay: 5, keywords: ["中秋", "月饼", "赏月", "团聚", "嫦娥", "桂花"] },
  { name: "nationalDay", startMonth: 10, startDay: 1, endMonth: 10, endDay: 7, keywords: ["国庆", "祖国", "和平", "繁荣", "富强"] },
  { name: "singlesDay", startMonth: 11, startDay: 1, endMonth: 11, endDay: 11, keywords: ["双十一", "购物", "单身", "狂欢"] },
  { name: "christmas", startMonth: 12, startDay: 20, endMonth: 12, endDay: 31, keywords: ["圣诞", "礼物", "平安", "雪花", "驯鹿"] }
];
