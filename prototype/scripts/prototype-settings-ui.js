// prototype/scripts/prototype-settings-ui.js v5.2.56 · 设置面板与云同步交互

const settingsPanel = $('#settings-dialog');
const settingsScrim = $('#settings-scrim');
let settingsCloseTimer = null;

function openSettings() {
  clearTimeout(settingsCloseTimer);
  settingsPanel.hidden = false;
  settingsScrim.hidden = false;
  requestAnimationFrame(() => {
    settingsPanel.classList.add('open');
    settingsScrim.classList.add('open');
  });
  $('#settings-close').focus();
}

function closeSettings() {
  settingsPanel.classList.remove('open');
  settingsScrim.classList.remove('open');
  settingsCloseTimer = setTimeout(() => {
    settingsPanel.hidden = true;
    settingsScrim.hidden = true;
  }, 250);
  $('#settings-open').focus();
}

$('#settings-open').addEventListener('click', openSettings);
$('#drawer-settings').addEventListener('click', () => { closeDrawer(); openSettings(); });
$('#settings-close').addEventListener('click', closeSettings);
settingsScrim.addEventListener('click', closeSettings);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !settingsPanel.hidden) closeSettings();
});

/* ---------- 主题三态（对齐生产 Radiogroup） ---------- */
const themeButtons = $$('#theme-radio button');
function syncThemeUI(value) {
  themeButtons.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.theme === value)));
}
syncThemeUI(localStorage.getItem('hm-theme') || 'system');
themeButtons.forEach((b) => b.addEventListener('click', () => {
  const value = b.dataset.theme;
  localStorage.setItem('hm-theme', value);
  syncThemeUI(value);
  const dark = value === 'dark' ||
    (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyTheme(dark);
  toast(t('settings.appearance') + ' · ' + t('settings.theme' + value[0].toUpperCase() + value.slice(1)), 'info');
}));

/* ---------- 语言选择（与头部菜单双向同步） ---------- */
const settingsLang = $('#settings-language');
const PROTO_LOCALES = ['en', 'zh-CN', 'ja', 'es'];
function syncLanguageUI() {
  settingsLang.value = PROTO_LOCALES.includes(lang) ? lang : 'en';
  $$('#locale-wrap .locale-menu button').forEach((b) => {
    b.setAttribute('aria-selected', String(b.dataset.lang === lang));
  });
}
syncLanguageUI();
settingsLang.addEventListener('change', () => {
  lang = settingsLang.value;
  localStorage.setItem('hm-lang', lang);
  applyI18n();
  syncLanguageUI();
  renderLearn();
  renderDetail();
  toast(t('toast.selected') + ' · ' + t('brandSub'), 'info');
});

/* ---------- 偏好开关 ---------- */
const hapticsToggle = $('#settings-haptics');
const reduceMotionToggle = $('#settings-reduce-motion');
hapticsToggle.checked = localStorage.getItem('hm-haptics') !== 'false';
reduceMotionToggle.checked = localStorage.getItem('hm-reduce-motion') === 'true';
document.documentElement.classList.toggle('reduce-motion', reduceMotionToggle.checked);
hapticsToggle.addEventListener('change', () => {
  localStorage.setItem('hm-haptics', String(hapticsToggle.checked));
});
reduceMotionToggle.addEventListener('change', () => {
  localStorage.setItem('hm-reduce-motion', String(reduceMotionToggle.checked));
  document.documentElement.classList.toggle('reduce-motion', reduceMotionToggle.checked);
});

/* ---------- 云端同步（演示，无后端） ---------- */
const syncCodeInput = $('#cloud-sync-code');
$('#cloud-generate').addEventListener('click', () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let body = '';
  for (let i = 0; i < 8; i++) body += (i === 4 ? '-' : '') + chars[Math.floor(Math.random() * chars.length)];
  syncCodeInput.value = 'HM-' + body;
  toast(t('cloud.generated'), 'success');
});
$('#cloud-copy').addEventListener('click', async () => {
  if (!syncCodeInput.value.trim()) { $('#cloud-generate').click(); return; }
  try {
    await navigator.clipboard.writeText(syncCodeInput.value.trim());
    toast(t('cloud.copied'), 'success');
  } catch {
    syncCodeInput.select();
    toast(t('cloud.copied'), 'info');
  }
});
$('#cloud-upload').addEventListener('click', () => toast(t('cloud.uploaded'), 'success'));
$('#cloud-download').addEventListener('click', () => toast(t('cloud.downloaded'), 'success'));

/* ---------- 进度导出 / 重置 ---------- */
$('#settings-export').addEventListener('click', () => toast(t('settings.export') + ' · demo', 'info'));
const resetConfirm = $('#settings-reset-confirm');
$('#settings-reset').addEventListener('click', () => { resetConfirm.hidden = false; });
$('#settings-reset-no').addEventListener('click', () => { resetConfirm.hidden = true; });
$('#settings-reset-yes').addEventListener('click', () => {
  ['hm-progress', 'hm-haptics', 'hm-reduce-motion', 'hm-theme'].forEach((k) => localStorage.removeItem(k));
  resetConfirm.hidden = true;
  closeSettings();
  toast(t('common.yes'), 'success');
});

/* ---------- 重新应用文案（part1.js 初始化早于本补丁） ---------- */
applyI18n();
$$('[data-i18n-title]').forEach((el) => {
  const value = t(el.getAttribute('data-i18n-title'));
  if (value != null) {
    el.setAttribute('title', value);
    el.setAttribute('aria-label', value);
  }
});
