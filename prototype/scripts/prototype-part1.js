// prototype/scripts/prototype-part1.js v5.2.27 · JS part 1/3
/* ===================== 真实汉字数据（与 src/lib/characters.ts 对齐） ===================== */
const CHARACTERS = [
  { hanzi:'一', pinyin:'yī', en:'One', zh:'一', strokes:1, radical:'一',
    words:[{text:'一天',py:'yī tiān',en:'One day'},{text:'一个',py:'yī gè',en:'One item'},{text:'第一',py:'dì yī',en:'First'}],
    example:{s:'我有一本书。',py:'Wǒ yǒu yī běn shū.',en:'I have a book.'} },
  { hanzi:'二', pinyin:'èr', en:'Two', zh:'二', strokes:2, radical:'二',
    words:[{text:'二月',py:'èr yuè',en:'February'},{text:'第二',py:'dì èr',en:'Second'},{text:'二十',py:'èr shí',en:'Twenty'}],
    example:{s:'他今年二十岁。',py:'Tā jīn nián èr shí suì.',en:'He is twenty years old this year.'} },
  { hanzi:'三', pinyin:'sān', en:'Three', zh:'三', strokes:3, radical:'一',
    words:[{text:'三月',py:'sān yuè',en:'March'},{text:'三个',py:'sān gè',en:'Three items'},{text:'三十',py:'sān shí',en:'Thirty'}],
    example:{s:'桌上有三个苹果。',py:'Zhuō shàng yǒu sān gè píngguǒ.',en:'There are three apples on the table.'} },
  { hanzi:'人', pinyin:'rén', en:'Person', zh:'人', strokes:2, radical:'人',
    words:[{text:'人们',py:'rénmen',en:'People'},{text:'大人',py:'dàrén',en:'Adult'},{text:'中国人',py:'Zhōngguó rén',en:'Chinese person'}],
    example:{s:'他是一个好人。',py:'Tā shì yī gè hǎo rén.',en:'He is a good person.'} },
  { hanzi:'大', pinyin:'dà', en:'Big', zh:'大', strokes:3, radical:'大',
    words:[{text:'大人',py:'dàrén',en:'Adult'},{text:'大学',py:'dàxué',en:'University'},{text:'伟大',py:'wěidà',en:'Great'}],
    example:{s:'这是一个大苹果。',py:'Zhè shì yī gè dà píngguǒ.',en:'This is a big apple.'} },
  { hanzi:'小', pinyin:'xiǎo', en:'Small', zh:'小', strokes:3, radical:'小',
    words:[{text:'小孩',py:'xiǎohái',en:'Child'},{text:'小学',py:'xiǎoxué',en:'Primary school'},{text:'小心',py:'xiǎoxīn',en:'Be careful'}],
    example:{s:'小猫很可爱。',py:'Xiǎo māo hěn kě\'ài.',en:'The kitten is cute.'} },
  { hanzi:'口', pinyin:'kǒu', en:'Mouth', zh:'口', strokes:3, radical:'口',
    words:[{text:'口水',py:'kǒushuǐ',en:'Saliva'},{text:'入口',py:'rùkǒu',en:'Entrance'},{text:'出口',py:'chūkǒu',en:'Exit'}],
    example:{s:'请张开你的口。',py:'Qǐng zhāngkāi nǐ de kǒu.',en:'Please open your mouth.'} },
  { hanzi:'日', pinyin:'rì', en:'Sun / Day', zh:'日', strokes:4, radical:'日',
    words:[{text:'日子',py:'rìzi',en:'Days'},{text:'明日',py:'míngrì',en:'Tomorrow'},{text:'日本',py:'Rìběn',en:'Japan'}],
    example:{s:'今天是好日子。',py:'Jīntiān shì hǎo rìzi.',en:'Today is a good day.'} },
  { hanzi:'月', pinyin:'yuè', en:'Moon / Month', zh:'月', strokes:4, radical:'月',
    words:[{text:'月亮',py:'yuèliàng',en:'Moon'},{text:'月份',py:'yuèfèn',en:'Month'},{text:'正月',py:'zhēngyuè',en:'First month'}],
    example:{s:'今晚的月亮很美。',py:'Jīn wǎn de yuèliàng hěn měi.',en:'The moon is beautiful tonight.'} },
  { hanzi:'山', pinyin:'shān', en:'Mountain', zh:'山', strokes:3, radical:'山',
    words:[{text:'山水',py:'shānshuǐ',en:'Landscape'},{text:'上山',py:'shàngshān',en:'Climb mountain'},{text:'雪山',py:'xuěshān',en:'Snow mountain'}],
    example:{s:'我想去爬山。',py:'Wǒ xiǎng qù pá shān.',en:'I want to go mountain climbing.'} },
  { hanzi:'水', pinyin:'shuǐ', en:'Water', zh:'水', strokes:4, radical:'水',
    words:[{text:'水果',py:'shuǐguǒ',en:'Fruit'},{text:'河水',py:'héshuǐ',en:'River water'},{text:'喝水',py:'hēshuǐ',en:'Drink water'}],
    example:{s:'请给我一杯水。',py:'Qǐng gěi wǒ yī bēi shuǐ.',en:'Please give me a glass of water.'} },
  { hanzi:'火', pinyin:'huǒ', en:'Fire', zh:'火', strokes:4, radical:'火',
    words:[{text:'火车',py:'huǒchē',en:'Train'},{text:'火苗',py:'huǒmiáo',en:'Flame'},{text:'火山',py:'huǒshān',en:'Volcano'}],
    example:{s:'小心火！',py:'Xiǎoxīn huǒ!',en:'Be careful with fire!'} }
];

/* ===================== i18n（原型演示：en / zh-CN / ja / es） ===================== */
const I18N = {
  en: {
    brandSub:'HanziMaster', nav:{home:'Home',learn:'Learn',practice:'Practice'},
    home:{badge:'Interactive Learning', title:'Master Chinese Characters', titleCn:'以东方笔墨，习汉字之美',
      lead:'HanziMaster helps you master Chinese characters through guided practice, stroke-order demonstrations, and immersive review.',
      cta1:'Start Learning', cta2:'Practice Studio', yongTitle:'The Character 永', yongDesc:'The eternal stroke — foundation of calligraphy, containing the eight basic brush techniques.', yongStroke:'Stroke mastery',
      featTitle:'Why HanziMaster', featSub:'Thoughtfully designed for depth, clarity, and delight.'},
    feat:{feedback:{title:'Stroke Feedback',desc:'Study each character with clear stroke-order guidance and structure hints to build confident, beautiful handwriting.'},
      ety:{title:'Etymology & Culture',desc:'Uncover the story behind each character — radicals, structure, and cultural roots.'},
      ada:{title:'Adaptive Learning',desc:'Spaced repetition and progress tracking keep you in flow, every single day.'}},
    learn:{title:'Daily Practice', sub:'Select a character to explore its stroke order, words, and meaning.',
      playAudio:'Play audio', startQuiz:'Start Quiz', nextChar:'Next character', strokeCount:'{n} strokes',
      pinyin:'Pinyin', meaning:'Meaning', words:'Words & Phrases', strokeOrder:'Stroke Order', example:'Example',
      quizTitle:'Pinyin Quiz', quizDesc:'Choose the correct pinyin for this character.', quizPlaceholder:'Type pinyin…', quizCorrect:'Correct!', quizIncorrect:'Not quite.'},
    practice:{title:'Practice Center', sub:'Writing, quizzes, and weekly progress — all in one calm space.',
      write:{title:'Writing Practice',desc:'Trace each character on a guided canvas with stroke-order guidance.'},
      quiz:{title:'Memory Quiz',desc:'Test recognition and pronunciation across your learned set.'},
      progress:{title:'Progress',desc:'Review your weekly streak, accuracy, and characters learned.'},
      start:'Start now', weekTitle:"This Week's Progress", clear:'Clear', next:'Next',
      mon:'Mon',tue:'Tue',wed:'Wed',thu:'Thu',fri:'Fri',sat:'Sat',sun:'Sun', today:'Today', pending:'—'},
    stat:{learned:'Characters learned', streak:'Day streak', accuracy:'Accuracy'},
    common:{close:'Close', skipToContent:'Skip to content'}, quiz:{desc:'Choose the correct pinyin for this character.', next:'Next',
      correct:'Correct!', incorrect:'Incorrect.'},
    toast:{welcome:'Welcome to HanziMaster', selected:'Selected', copied:'Audio playing (demo)', saved:'Progress saved'}
  },
  'zh-CN': {
    brandSub:'汉字大师', nav:{home:'首页',learn:'学习',practice:'练习'},
    home:{badge:'互动学习', title:'掌握汉字', titleCn:'以东方笔墨，习汉字之美',
      lead:'汉字大师通过引导式练习、笔顺演示与沉浸式复习，助你掌握汉字书写。',
      cta1:'开始学习', cta2:'练习工作室', yongTitle:'永字', yongDesc:'永字八法，书法之基，蕴含八大基本笔法。', yongStroke:'笔画掌握度',
      featTitle:'为何选择汉字大师', featSub:'为深度、清晰与愉悦而精心打造。'},
    feat:{feedback:{title:'笔画反馈',desc:'借助清晰的笔顺指引与结构提示研习每个汉字，写出自信、美观的字迹。'},
      ety:{title:'字源与文化',desc:'揭示每个字背后的故事 —— 部首、结构与文化根源。'},
      ada:{title:'自适应学习',desc:'间隔重复与进度追踪，让你每天保持心流。'}},
    learn:{title:'每日练习', sub:'选择一个汉字，探索其笔顺、词语与字义。',
      playAudio:'播放发音', startQuiz:'开始测验', nextChar:'下一个字', strokeCount:'{n} 画',
      pinyin:'拼音', meaning:'释义', words:'词语', strokeOrder:'笔顺', example:'例句',
      quizTitle:'拼音测验', quizDesc:'输入该字的拼音。', quizPlaceholder:'输入拼音…', quizCorrect:'正确！', quizIncorrect:'不太对。'},
    practice:{title:'练习中心', sub:'书写、测验与每周进度，尽在一方静谧空间。',
      write:{title:'书写练习',desc:'在引导画布上描红，获得实时反馈。'},
      quiz:{title:'记忆测验',desc:'在你的学习集中检验识别与发音。'},
      progress:{title:'学习进度',desc:'回顾每周连胜、正确率与已学字数。'},
      start:'立即开始', weekTitle:'本周学习进度', clear:'清除', next:'下一个',
      mon:'一',tue:'二',wed:'三',thu:'四',fri:'五',sat:'六',sun:'日', today:'今天', pending:'—'},
    stat:{learned:'已学汉字', streak:'连续天数', accuracy:'正确率'},
    common:{close:'关闭', skipToContent:'跳到主内容'}, quiz:{desc:'为该字选择正确的拼音。', next:'下一题',
      correct:'正确！', incorrect:'答错了。'},
    toast:{welcome:'欢迎使用汉字大师', selected:'已选择', copied:'正在播放发音（演示）', saved:'进度已保存'}
  },
  ja: {
    brandSub:'漢字マスター', nav:{home:'ホーム',learn:'学習',practice:'練習'},
    home:{badge:'インタラクティブ学習', title:'漢字を習得する', titleCn:'東方の筆で、漢字の美を',
      lead:'HanziMasterは、ガイド付き練習、筆順デモ、没入型の復習を通して、中国語の文字をマスターするお手伝いをします。',
      cta1:'学習を始める', cta2:'練習スタジオ', yongTitle:'文字「永」', yongDesc:'永字八法、書道の基礎となる八つの基本筆法。', yongStroke:'筆使い習得度',
      featTitle:'漢字マスターの特長', featSub:'深さ・明快さ・喜びのために丁寧に設計。'},
    feat:{feedback:{title:'筆画フィードバック',desc:'明確な筆順ガイドと構造ヒントで各文字を学び、自信に満ちた美しい書き味を身につけます。'},
      ety:{title:'語源と文化',desc:'部首・構造・文化的ルーツを含む各文字の物語を解き明かす。'},
      ada:{title:'適応型学習',desc:'間隔反復と進捗管理で毎日フローを維持。'}},
    learn:{title:'毎日の練習', sub:'文字を選んで画順・単語・意味を探索。',
      playAudio:'発音を再生', startQuiz:'クイズを始める', nextChar:'次の文字', strokeCount:'{n}画',
      pinyin:'ピンイン', meaning:'意味', words:'単語', strokeOrder:'画順', example:'例文',
      quizTitle:'ピンインクイズ', quizDesc:'この文字のピンインを入力。', quizPlaceholder:'ピンインを入力…', quizCorrect:'正解！', quizIncorrect:'惜しい。'},
    practice:{title:'練習センター', sub:'書写・クイズ・週間進捗を一か所に。',
      write:{title:'書写練習',desc:'ガイド付きキャンバスでなぞり書き、リアルタイム反馈。'},
      quiz:{title:'記憶クイズ',desc:'学習セット全体で認識と発音を確認。'},
      progress:{title:'進捗',desc:'週間連続・正答率・習得文字数を確認。'},
      start:'今すぐ開始', weekTitle:'今週の進捗', clear:'クリア', next:'次へ',
      mon:'月',tue:'火',wed:'水',thu:'木',fri:'金',sat:'土',sun:'日', today:'今日', pending:'—'},
    stat:{learned:'習得文字', streak:'連続日数', accuracy:'正答率'},
    common:{close:'閉じる', skipToContent:'メインコンテンツへ'}, quiz:{desc:'この文字の正しいピンインを選択。', next:'次へ', correct:'正解！', incorrect:'不正解。'},
    toast:{welcome:'漢字マスターへようこそ', selected:'選択済み', copied:'発音再生中（デモ）', saved:'進捗を保存'}
  },
  es: {
    brandSub:'Maestro Hanzi', nav:{home:'Inicio',learn:'Aprender',practice:'Practicar'},
    home:{badge:'Aprendizaje Interactivo', title:'Domina los caracteres chinos', titleCn:'Con la pincelada oriental, la belleza del Hanzi',
      lead:'HanziMaster te ayuda a dominar los caracteres chinos mediante práctica guiada, demostración del orden de trazos y repaso inmersivo.',
      cta1:'Empezar', cta2:'Estudio de práctica', yongTitle:'El carácter 永', yongDesc:'El trazo eterno — base de la caligrafía, con las ocho técnicas básicas.', yongStroke:'Dominio del trazo',
      featTitle:'Por qué HanziMaster', featSub:'Diseñado con profundidad, claridad y deleite.'},
    feat:{feedback:{title:'Retroalimentación de Trazos',desc:'Estudia cada carácter con guías claras del orden de trazos y pistas de estructura para escribir con soltura y belleza.'},
      ety:{title:'Etimología y cultura',desc:'Descubre la historia de cada carácter — radicales, estructura y raíces.'},
      ada:{title:'Aprendizaje adaptable',desc:'Repetición espaciada y seguimiento del progreso cada día.'}},
    learn:{title:'Práctica diaria', sub:'Elige un carácter para explorar su orden, palabras y significado.',
      playAudio:'Reproducir audio', startQuiz:'Iniciar quiz', nextChar:'Siguiente', strokeCount:'{n} trazos',
      pinyin:'Pinyin', meaning:'Significado', words:'Palabras', strokeOrder:'Orden de trazos', example:'Ejemplo',
      quizTitle:'Quiz de pinyin', quizDesc:'Escribe el pinyin de este carácter.', quizPlaceholder:'Escribe pinyin…', quizCorrect:'¡Correcto!', quizIncorrect:'Casi.'},
    practice:{title:'Centro de práctica', sub:'Escritura, quizzes y progreso semanal en un solo lugar.',
      write:{title:'Práctica de escritura',desc:'Traza cada carácter en un lienzo guiado con feedback en vivo.'},
      quiz:{title:'Quiz de memoria',desc:'Pon a prueba reconocimiento y pronunciación.'},
      progress:{title:'Progreso',desc:'Revisa tu racha, precisión y caracteres aprendidos.'},
      start:'Empezar', weekTitle:'Progreso semanal', clear:'Limpiar', next:'Siguiente',
      mon:'Lun',tue:'Mar',wed:'Mié',thu:'Jue',fri:'Vie',sat:'Sáb',sun:'Dom', today:'Hoy', pending:'—'},
    stat:{learned:'Caracteres', streak:'Racha', accuracy:'Precisión'},
    common:{close:'Cerrar', skipToContent:'Saltar al contenido'}, quiz:{desc:'Elige el pinyin correcto para este carácter.', next:'Siguiente', correct:'¡Correcto!', incorrect:'Incorrecto.'},
    toast:{welcome:'Bienvenido a HanziMaster', selected:'Seleccionado', copied:'Reproduciendo audio (demo)', saved:'Progreso guardado'}
  }
};

let lang = localStorage.getItem('hm-lang') || 'en';
let selectedId = CHARACTERS[0].hanzi;

/* ===================== 工具 ===================== */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
function t(path){ // 简易路径取值：支持 "learn.title"
  const dict = I18N[lang] || I18N.en;
  return path.split('.').reduce((o,k)=> (o&&o[k]!=null)?o[k]:null, dict) ?? path;
}
function strokeCount(n){ return (t('learn.strokeCount')||'{n} strokes').replace('{n}', n); }

/* ===================== i18n 应用 ===================== */
function applyI18n(){
  $$('[data-i18n]').forEach(el=>{
    const v = t(el.getAttribute('data-i18n'));
    if (v!=null) el.textContent = v;
  });
  // 文档语言
  document.documentElement.lang = (lang==='zh-CN')?'zh-CN':(lang==='ja'?'ja':(lang==='es'?'es':'en'));
}

/* ===================== 主题 ===================== */
function applyTheme(dark){
  document.documentElement.classList.toggle('dark', dark);
  $('#theme-btn').setAttribute('aria-pressed', String(dark));
  $('.i-sun').style.display = dark ? 'none' : 'block';
  $('.i-moon').style.display = dark ? 'block' : 'none';
}
let isDark = localStorage.getItem('hm-theme') === 'dark' ||
  (localStorage.getItem('hm-theme')===null && matchMedia('(prefers-color-scheme: dark)').matches);
applyTheme(isDark);
$('#theme-btn').addEventListener('click', ()=>{
  isDark = !isDark;
  localStorage.setItem('hm-theme', isDark?'dark':'light');
  applyTheme(isDark);
});

