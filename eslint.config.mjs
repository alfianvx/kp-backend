import config from "eslint-config-standard";

export default {
  ...config,
  env: {
    es2021: true,
    node: true,
  },
  extends: "standard-with-typescript",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["**/build/*", "**/node_modules/*", "**/public/*"],
  rules: {},
};
