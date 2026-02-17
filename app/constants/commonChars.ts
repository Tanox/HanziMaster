// app/constants/commonChars.ts v0.7.2

// HSK Level 1 (approx 174 chars)
const HSK1_CHARS = "爱八爸杯北京本不客气菜茶吃出租车打电话大的是点脑视影东西都读对起多少儿二饭店飞机分钟高兴个工作狗汉语好号喝和很后回会火车站几家叫今天九开看块来老师了冷里零六妈妈吗买猫没关有米明名哪那呢能你年女朋漂亮果七钱前请去热人认日三商上午少谁什十时候书水睡觉说四岁他她太天听同喂我五喜下雨先生现想小些写谢星学一衣医医院椅月再见在怎么这中国午住桌字昨坐做";

// HSK Level 2 (approx 173 new chars)
const HSK2_CHARS = "吧白百帮助报纸比别长唱歌出穿次从错篮球大家到得等弟第一懂房非常务员高诉哥公汽司贵过还孩好吃黑红欢迎回答机场鸡蛋件教姐介绍进近就觉咖开始考可能以课快累离两路旅卖慢忙每妹门条男您牛旁跑便宜票妻床千铅笔晴让上班身病日情表手送虽然但它踢球题跳舞外完玩晚为问西希洗向笑新姓休雪颜眼羊药要也已意因所阴游右鱼远运早丈夫找着真知准走最左";

// HSK Level 3 (Selected high frequency)
const HSK3_CHARS = "阿姨啊矮爱安把搬办半包饱北被鼻较赛笔必须变冰并玻脖才草层差超衬衫绩市迟除船春词聪明打扫算带心单档蛋糕灯地地第图铁梯电冬动段短炼饿耳发烧放附复干感冒刚根据跟更公园故刮风关系心于害怕黑板护照花画坏环换黄议或者极急季检简脚角教接街目经旧救举句决爱渴刻空口哭裤筷蓝老离脸练辆凉量留楼绿马满帽面明白拿南难年鸟努力爬山盘胖皮啤酒瓶其实其奇怪骑起墙清楚秋裙然后热认为真容易如果伞网声世试瘦叔舒树数刷双水瓶平司送诉算太疼提育甜条事头突腿完碗万往忘为位化西习洗澡夏像小心校校新信兴星熊需选要求爷一一样直银饮应该响用戏又遇元员愿月越张急顾片只中重周主注祝己总是嘴";

// Functional Categories
const NUMBERS = "一二三四五六七八九十百千万亿零两";
const NATURE = "天地日月星山水火土木风云雨雪电河海草花树林森石田光";
const BODY = "身体头面脸眼耳口鼻牙手足脚心血";
const FAMILY = "爸妈哥姐弟妹爷奶儿孙朋友";
const COLORS = "红黄蓝绿白黑紫橙灰粉棕";
const DIRECTIONS = "上下左右前后里外中东西南北边";
const ACTIONS = "看听说读写吃喝睡觉坐站走跑跳飞来去回出入开关买卖送找给拿放做作干学习思想爱喜欢笑哭问答叫住玩打洗穿戴";

const ALL_CHARS = HSK1_CHARS + HSK2_CHARS + HSK3_CHARS + NUMBERS + NATURE + BODY + FAMILY + COLORS + DIRECTIONS + ACTIONS;

// Remove duplicates and create a unique set
export const COMMON_CHARS = Array.from(new Set(ALL_CHARS.split('')));