import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: 'index.js',
  plugins: [ babel(babelrc()) ],
  dest: 'index_p.js',
  format: 'umd',
  moduleName: 'canvasPerf',
  external: []
};