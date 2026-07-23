const expoConfig = require("eslint-config-expo/flat");
const eslintConfigPrettier = require("eslint-config-prettier");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = [
  {
    ignores: ["node_modules/**", ".expo/**", "dist/**", "build/**"],
  },
  ...expoConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "react/display-name": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  eslintConfigPrettier,
];
