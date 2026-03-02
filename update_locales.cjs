const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    progressTitle: "Learning Progress",
    statsTotal: "Total Items",
    statsNew: "New",
    statsApprentice: "Apprentice",
    statsGuru: "Guru",
    statsMaster: "Master"
  },
  'zh-CN': {
    progressTitle: "学习进度",
    statsTotal: "已学汉字",
    statsNew: "初学",
    statsApprentice: "熟练",
    statsGuru: "精通",
    statsMaster: "大师"
  },
  'zh-TW': {
    progressTitle: "學習進度",
    statsTotal: "已學漢字",
    statsNew: "初學",
    statsApprentice: "熟練",
    statsGuru: "精通",
    statsMaster: "大師"
  },
  ja: {
    progressTitle: "学習の進捗",
    statsTotal: "学習済み",
    statsNew: "新規",
    statsApprentice: "見習い",
    statsGuru: "熟練",
    statsMaster: "達人"
  },
  ko: {
    progressTitle: "학습 진행 상황",
    statsTotal: "학습한 항목",
    statsNew: "신규",
    statsApprentice: "초보",
    statsGuru: "숙련",
    statsMaster: "마스터"
  },
  es: {
    progressTitle: "Progreso de Aprendizaje",
    statsTotal: "Total",
    statsNew: "Nuevo",
    statsApprentice: "Aprendiz",
    statsGuru: "Gurú",
    statsMaster: "Maestro"
  },
  fr: {
    progressTitle: "Progression de l'Apprentissage",
    statsTotal: "Total",
    statsNew: "Nouveau",
    statsApprentice: "Apprenti",
    statsGuru: "Gourou",
    statsMaster: "Maître"
  },
  de: {
    progressTitle: "Lernfortschritt",
    statsTotal: "Gesamt",
    statsNew: "Neu",
    statsApprentice: "Lehrling",
    statsGuru: "Guru",
    statsMaster: "Meister"
  },
  it: {
    progressTitle: "Progresso di Apprendimento",
    statsTotal: "Totale",
    statsNew: "Nuovo",
    statsApprentice: "Apprendista",
    statsGuru: "Guru",
    statsMaster: "Maestro"
  },
  pt: {
    progressTitle: "Progresso de Aprendizado",
    statsTotal: "Total",
    statsNew: "Novo",
    statsApprentice: "Aprendiz",
    statsGuru: "Guru",
    statsMaster: "Mestre"
  },
  ru: {
    progressTitle: "Прогресс Обучения",
    statsTotal: "Всего",
    statsNew: "Новый",
    statsApprentice: "Ученик",
    statsGuru: "Гуру",
    statsMaster: "Мастер"
  },
  ar: {
    progressTitle: "تقدم التعلم",
    statsTotal: "إجمالي العناصر",
    statsNew: "جديد",
    statsApprentice: "متدرب",
    statsGuru: "خبير",
    statsMaster: "سيد"
  },
  id: {
    progressTitle: "Kemajuan Belajar",
    statsTotal: "Total",
    statsNew: "Baru",
    statsApprentice: "Magang",
    statsGuru: "Guru",
    statsMaster: "Master"
  },
  th: {
    progressTitle: "ความคืบหน้าการเรียนรู้",
    statsTotal: "ทั้งหมด",
    statsNew: "ใหม่",
    statsApprentice: "ฝึกหัด",
    statsGuru: "ผู้เชี่ยวชาญ",
    statsMaster: "ปรมาจารย์"
  },
  vi: {
    progressTitle: "Tiến độ học tập",
    statsTotal: "Tổng số",
    statsNew: "Mới",
    statsApprentice: "Người học việc",
    statsGuru: "Chuyên gia",
    statsMaster: "Bậc thầy"
  }
};

const localesDir = path.join(__dirname, 'app', 'locales');
fs.readdirSync(localesDir).forEach(file => {
  if (file.endsWith('.ts') && file !== 'index.ts') {
    const lang = file.replace('.ts', '');
    const filePath = path.join(localesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const trans = translations[lang] || translations['en'];
    
    if (!content.includes('progressTitle:')) {
      const transString = Object.entries(trans)
        .map(([key, value]) => `  ${key}: "${value}",`)
        .join('\n');
        
      content = content.replace(/};\s*$/, `${transString}\n};\n`);
      
      content = content.replace(/\/\/ app\/locales\/[\w-]+\.ts v\d+\.\d+\.\d+/, `// app/locales/${file} v1.3.4`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Skipped ${file} (already contains progressTitle)`);
    }
  }
});
