import fs from 'fs';
const V = '5.2.30';
const dir = 'src/lib/i18n/translations/';

const T = {
  en: { et: 'Nothing here yet', ed: 'Select a character to start learning.', rt: 'Something went wrong', rd: 'An unexpected error occurred.', nt: 'Page not found', nd: 'The page you are looking for does not exist.', retry: 'Retry', home: 'Back to home', kbd: 'Use ← → to switch characters' },
  'zh-CN': { et: '这里还是空的', ed: '选择一个汉字开始学习。', rt: '出错了', rd: '发生了意外错误。', nt: '页面不存在', nd: '您访问的页面不存在。', retry: '重试', home: '返回首页', kbd: '使用 ← → 切换汉字' },
  'zh-TW': { et: '這裡還是空的', ed: '選擇一個漢字開始學習。', rt: '發生錯誤', rd: '發生了意外錯誤。', nt: '頁面不存在', nd: '您造訪的頁面不存在。', retry: '重試', home: '返回首頁', kbd: '使用 ← → 切換漢字' },
  es: { et: 'Aún no hay nada aquí', ed: 'Selecciona un carácter para empezar a aprender.', rt: 'Algo salió mal', rd: 'Ocurrió un error inesperado.', nt: 'Página no encontrada', nd: 'La página que buscas no existe.', retry: 'Reintentar', home: 'Volver al inicio', kbd: 'Usa ← → para cambiar de carácter' },
  ar: { et: 'لا يوجد شيء هنا بعد', ed: 'اختر حرفًا لبدء التعلم.', rt: 'حدث خطأ ما', rd: 'حدث خطأ غير متوقع.', nt: 'الصفحة غير موجودة', nd: 'الصفحة التي تبحث عنها غير موجودة.', retry: 'إعادة المحاولة', home: 'العودة إلى الرئيسية', kbd: 'استخدم ← → للتبديل بين الأحرف' },
  fr: { et: 'Rien ici pour l’instant', ed: 'Sélectionnez un caractère pour commencer à apprendre.', rt: 'Une erreur est survenue', rd: 'Une erreur inattendue s’est produite.', nt: 'Page introuvable', nd: 'La page que vous recherchez n’existe pas.', retry: 'Réessayer', home: 'Retour à l’accueil', kbd: 'Utilisez ← → pour changer de caractère' },
  'pt-BR': { et: 'Nada aqui ainda', ed: 'Selecione um caractere para começar a aprender.', rt: 'Algo deu errado', rd: 'Ocorreu um erro inesperado.', nt: 'Página não encontrada', nd: 'A página que você procura não existe.', retry: 'Tentar novamente', home: 'Voltar para o início', kbd: 'Use ← → para trocar de caractere' },
  de: { et: 'Hier ist noch nichts', ed: 'Wähle ein Zeichen aus, um zu lernen.', rt: 'Etwas ist schiefgelaufen', rd: 'Ein unerwarteter Fehler ist aufgetreten.', nt: 'Seite nicht gefunden', nd: 'Die gesuchte Seite existiert nicht.', retry: 'Erneut versuchen', home: 'Zurück zur Startseite', kbd: 'Mit ← → Zeichen wechseln' },
  ja: { et: 'まだ何もありません', ed: '漢字を選んで学習を始めましょう。', rt: '問題が発生しました', rd: '予期しないエラーが発生しました。', nt: 'ページが見つかりません', nd: 'お探しのページは存在しません。', retry: '再試行', home: 'ホームに戻る', kbd: '← → で漢字を切り替え' },
  ko: { et: '아직 아무것도 없습니다', ed: '한자를 선택하여 학습을 시작하세요.', rt: '문제가 발생했습니다', rd: '예기치 않은 오류가 발생했습니다.', nt: '페이지를 찾을 수 없습니다', nd: '찾으시는 페이지가 존재하지 않습니다.', retry: '다시 시도', home: '홈으로 돌아가기', kbd: '← → 키로 한자 전환' },
  ru: { et: 'Здесь пока ничего нет', ed: 'Выберите иероглиф, чтобы начать обучение.', rt: 'Что-то пошло не так', rd: 'Произошла непредвиденная ошибка.', nt: 'Страница не найдена', nd: 'Страница, которую вы ищете, не существует.', retry: 'Повторить', home: 'На главную', kbd: 'Переключайте иероглифы клавишами ← →' },
};

for (const [loc, t] of Object.entries(T)) {
  const file = `${dir}${loc}.ts`;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const q = s => `'${s.replace(/'/g, "\\'")}'`;
  const block = [
    `    emptyTitle: ${q(t.et)},`,
    `    emptyDesc: ${q(t.ed)},`,
    `    errorTitle: ${q(t.rt)},`,
    `    errorDesc: ${q(t.rd)},`,
    `    notFoundTitle: ${q(t.nt)},`,
    `    notFoundDesc: ${q(t.nd)},`,
    `    retry: ${q(t.retry)},`,
    `    backHome: ${q(t.home)},`,
  ];
  const navIdx = lines.findIndex(l => l.includes('navigationMenu:'));
  if (navIdx === -1) { console.error(`SKIP ${loc}: no navigationMenu`); continue; }
  if (!lines.some(l => l.includes('empty: {'))) lines.splice(navIdx + 1, 0, ...block);
  const quizIdx = lines.findIndex(l => l.includes('quizIncorrect:'));
  if (quizIdx !== -1 && !lines.some(l => l.includes('kbdHint:'))) lines.splice(quizIdx + 1, 0, `    kbdHint: ${q(t.kbd)},`);
  lines[0] = `// src/lib/i18n/translations/${loc}.ts v${V}`;
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`${loc}: ${lines.length} lines`);
}
