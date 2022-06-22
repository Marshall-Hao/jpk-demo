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
  plugins: [
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ]
};
