module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
        },
        // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
        "class-properties": { loose: true },
      },
    ],
  ],
};
