import { pugToJsx } from 'pug-as-jsx-utils';
import { createFilter } from 'rollup-pluginutils';

export default function pugAsJsx(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'pugAsJsx',

    transform(pugCode, id) {
      if (id.slice(-4) !== '.pug') return null;
      if (!filter(id)) return null;
      const { jsxTemplate } = pugToJsx(pugCode, {
        template: true,
        resolve: options.resolve || {},
      });
      const basename = id.split('/').pop().replace(/\.[a-zA-Z0-9]+$/, '');
      const code = jsxTemplate.replace(/%BASENAME%/g, `./${basename}`);
      return { code };
    },
  };
}
