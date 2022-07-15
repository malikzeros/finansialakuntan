module.exports = {
  root: true,
  env: {
    es6: true,
    requireConfigFile: false,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {"code": 120}],
    "require-jsdoc": 0,
    "linebreak-style": 0,
  },
  "parser": "@babel/eslint-parser",
};
