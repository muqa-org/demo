/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@muqa/eslint-config/next.js", 
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  settings: {
    "next": {
      "rootDir": __dirname
    },
  },
  parserOptions: {
    project: true,
  },
};
