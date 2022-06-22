module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@babel/eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {},
      { usePrettierrc: true },
    ],
    // next 组件不需要import react
    "react/react-in-jsx-scope": 0,
    semi: 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-closing-bracket-location": 0,
    // Conflict with prettier
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
    "eslint-comments/no-unlimited-disable": 0,
    "no-param-reassign": 2,
    "space-before-function-paren": 0,
    "import/extensions": 0,
    // extra
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
  },
};
