module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:flowtype/recommended",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "prettier",
    "react-native-globals",
    "import"
  ],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    // "react/destructuring-assignment": 0,
    // "react/forbid-prop-types": 0,
    // "import/no-named-as-default": 0,
    // "import/no-named-as-default-member": 0,
    // "global-require": "error",
    // "react/no-array-index-key": 0,
    // "class-methods-use-this": 0,
    // "prefer-promise-reject-errors": 0,
    // "prefer-const": 0,
    // "no-return-assign": 0,
    // "no-restricted-syntax": 0,
    // "no-prototype-builtins": 0,
    // "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "linebreak-style": 0,
    "react/require-default-props": 0,
    "import/no-cycle": 0,
    "comma-dangle": 1,
    "semi": 1,
    "react/no-unused-prop-types": 0
  },
  settings: {
    "import/resolver": {
      "alias": {
        "map": [
          [
            "~",
            "./src"
          ]
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".json"
        ]
      }
    }
  },
  env: {
    "jest": true
  }
};
