const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");
const nextPlugin = require("@next/eslint-plugin-next");
const parser = require("@typescript-eslint/parser");
const pluginTs = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["eslint.config.js", "next.config.js", "postcss.config.js", ".next/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react: pluginReact,
      "@next/next": nextPlugin,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
      "@next/next/no-html-link-for-pages": "warn",
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  pluginJs.configs.recommended,
];
