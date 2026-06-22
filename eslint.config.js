const nextPlugin = require("@next/eslint-plugin-next");
const pluginTs = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    },
  },
];
