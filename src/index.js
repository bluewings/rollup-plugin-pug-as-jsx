import { pugToJsx, babelTransform, codemod } from 'pug-as-jsx-utils';
import { createFilter } from 'rollup-pluginutils';

export default function pugAsJsx(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'pugAsJsx',

    transform(pugCode, id) {
      if (id.slice(-4) !== '.pug') return null;
      if (!filter(id)) return null;
      const { jsxTemplate, useThis, variables } = pugToJsx(pugCode, {
        template: true,
        resolve: options.resolve || {},
        rootDir: options.rootDir || undefined,
        resourcePath: id,
      });
      if (options.autoUpdateJsFile) {
        codemod({ useThis, variables }, id);
      }
      const code = babelTransform(jsxTemplate, id);
      return { code };
    },
  };
}
