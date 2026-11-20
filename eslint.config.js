import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "**/node_modules/**",
      // 四类固定临时目录 + 框架构建目录；历史 coverage/.tmp 仍保留兼容
      "tmp/**",
      "cache/**",
      "log/**",
      "reports/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      ".tmp/**",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: await import("@typescript-eslint/parser").then(m => m.default),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    },
  },
];
