import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: [".next/**", "node_modules/**", "**/node_modules/**"],
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
