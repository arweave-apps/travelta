/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const resources = [
  'utils/_variables.scss',
  'utils/_functions.scss',
  'utils/_mixins.scss',
];

module.exports = resources.map((file) => path.resolve(__dirname, file));
