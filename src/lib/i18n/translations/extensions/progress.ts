// src/lib/i18n/translations/extensions/progress.ts v5.2.44
// P2-17：进度导出/导入入口文案（11 语言齐全）。

export interface ProgressTexts {
  exportLabel: string;
  importLabel: string;
  importInvalid: string;
  importDone: string;
}

export const progressByLocale: Record<string, ProgressTexts> = {
  en: { exportLabel: 'Export progress', importLabel: 'Import progress', importInvalid: 'Invalid or corrupted backup file', importDone: 'Progress imported successfully' },
  'zh-CN': { exportLabel: '导出学习进度', importLabel: '导入学习进度', importInvalid: '备份文件无效或已损坏', importDone: '学习进度已导入' },
  'zh-TW': { exportLabel: '匯出學習進度', importLabel: '匯入學習進度', importInvalid: '備份檔案無效或已損壞', importDone: '學習進度已匯入' },
  es: { exportLabel: 'Exportar progreso', importLabel: 'Importar progreso', importInvalid: 'Archivo de copia no válido o dañado', importDone: 'Progreso importado correctamente' },
  ar: { exportLabel: 'تصدير التقدم', importLabel: 'استيراد التقدم', importInvalid: 'ملف النسخة الاحتياطية غير صالح أو تالف', importDone: 'تم استيراد التقدم بنجاح' },
  fr: { exportLabel: 'Exporter la progression', importLabel: 'Importer la progression', importInvalid: 'Fichier de sauvegarde invalide ou corrompu', importDone: 'Progression importée avec succès' },
  'pt-BR': { exportLabel: 'Exportar progresso', importLabel: 'Importar progresso', importInvalid: 'Arquivo de backup inválido ou corrompido', importDone: 'Progresso importado com sucesso' },
  de: { exportLabel: 'Fortschritt exportieren', importLabel: 'Fortschritt importieren', importInvalid: 'Ungültige oder beschädigte Sicherungsdatei', importDone: 'Fortschritt erfolgreich importiert' },
  ja: { exportLabel: '学習進捗をエクスポート', importLabel: '学習進捗をインポート', importInvalid: 'バックアップファイルが無効または破損しています', importDone: '学習進捗をインポートしました' },
  ko: { exportLabel: '학습 진행 내보내기', importLabel: '학습 진행 가져오기', importInvalid: '백업 파일이 유효하지 않거나 손상되었습니다', importDone: '학습 진행을 가져왔습니다' },
  ru: { exportLabel: 'Экспорт прогресса', importLabel: 'Импорт прогресса', importInvalid: 'Недопустимый или повреждённый файл резервной копии', importDone: 'Прогресс успешно импортирован' },
};
