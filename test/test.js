const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pugAsJsx = require('..');

process.chdir(__dirname);

describe('rollup-plugin-pug-as-jsx', () => {
  it('converts pug to jsx', () => rollup
    .rollup({
      input: 'samples/basic/main.jsx',
      plugins: [
        pugAsJsx(),
        babel({
          presets: ['@babel/preset-react'],
          extensions: ['js', '.jsx'],
        }),
      ],
    })
    .then(bundle => bundle.generate({ format: 'cjs' })));
});
