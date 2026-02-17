/**
 * app/constants/seasonalEvents.ts v0.7.1
 */
import { SeasonalEvent } from '../types';

export { type SeasonalEvent };

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  { name: "springFestival", startMonth: 1, startDay: 1, endMonth: 2, endDay: 20, keywords: ["春节", "福", "红包"] },
  { name: "midAutumn", startMonth: 9, startDay: 10, endMonth: 10, endDay: 5, keywords: ["中秋", "月饼", "赏月"] }
];