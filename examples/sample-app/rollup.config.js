import typescript from 'rollup-plugin-typescript';
import pugAsJsx from 'rollup-plugin-pug-as-jsx';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    pugAsJsx({
      resolve: {
        classnames: 'cx',
      },
    }),
    typescript(),
    babel({
      runtimeHelpers: true,
      plugins: ['@babel/transform-runtime'],
      extensions: ['.pug', '.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss({
      plugins: [
        tailwindcss(),
        postcssFlexbugsFixes,
        postcssPresetEnv({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    }),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
  ],
  external,
};
