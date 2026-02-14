
/**
 * HanziMaster v0.5.2
 * 节庆与时令事件定义
 */

export interface SeasonalEvent {
  name: string; // Translation Key
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  keywords: string[];
}

// 注意：这里使用的是公历近似日期，未来可接入农历算法库以获得更精确的日期
export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    name: "springFestival",
    startMonth: 1, startDay: 1,
    endMonth: 2, endDay: 20,
    keywords: [
        "春节", "恭喜发财", "福", "红包", "团圆", "新年快乐", "年年有余",
        "万象更新", "辞旧迎新", "五福临门", "喜气洋洋", "三阳开泰", "风调雨顺", 
        "国泰民安", "吉祥如意", "心想事成", "龙马精神", "步步高升", "花开富贵"
    ]
  },
  {
    name: "lanternFestival",
    startMonth: 2, startDay: 21,
    endMonth: 2, endDay: 28,
    keywords: [
        "元宵", "灯谜", "团圆", "张灯结彩", "火树银花", "欢天喜地", "皓月当空"
    ]
  },
  {
    name: "qingming",
    startMonth: 4, startDay: 1,
    endMonth: 4, endDay: 10,
    keywords: [
        "清明", "踏青", "纪念", "慎终追远", "饮水思源", "风和日丽", "春暖花开"
    ]
  },
  {
    name: "laborDay",
    startMonth: 4, startDay: 28,
    endMonth: 5, endDay: 5,
    keywords: [
        "劳动", "光荣", "休息", "勤劳致富", "自力更生", "精益求精", "劳逸结合"
    ]
  },
  {
    name: "dragonBoat",
    startMonth: 6, startDay: 1,
    endMonth: 6, endDay: 20,
    keywords: [
        "端午", "龙舟", "粽子", "屈原", "龙舟竞渡", "顺风顺水", "同舟共济", "激流勇进"
    ]
  },
  {
    name: "qixi",
    startMonth: 8, startDay: 1,
    endMonth: 8, endDay: 15,
    keywords: [
        "七夕", "爱情", "喜鹊", "天长地久", "海枯石烂", "心心相印", "比翼双飞", "琴瑟和鸣"
    ]
  },
  {
    name: "midAutumn",
    startMonth: 9, startDay: 10,
    endMonth: 10, endDay: 5,
    keywords: [
        "中秋", "月饼", "赏月", "团圆", "思念", "花好月圆", "皓月当空", "阖家团圆", "千里共婵娟"
    ]
  },
  {
    name: "nationalDay",
    startMonth: 10, startDay: 1,
    endMonth: 10, endDay: 7,
    keywords: [
        "国庆", "祖国", "繁荣", "和平", "举国同庆", "繁荣昌盛", "锦绣河山", "普天同庆"
    ]
  },
  {
    name: "singlesDay",
    startMonth: 11, startDay: 10,
    endMonth: 11, endDay: 12,
    keywords: [
        "光棍", "购物", "快乐", "独善其身", "宁缺毋滥", "自由自在"
    ]
  },
  {
    name: "christmas",
    startMonth: 12, startDay: 20,
    endMonth: 12, endDay: 26,
    keywords: [
        "圣诞", "礼物", "平安", "普天同庆", "瑞雪兆丰年", "喜出望外"
    ]
  }
];