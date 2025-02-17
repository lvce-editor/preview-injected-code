import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pluginTypeScript from '@babel/preset-typescript'

export default {
  input: 'src/previewInjectedCodeMain.ts',
  preserveEntrySignatures: 'strict',
  treeshake: {
    propertyReadSideEffects: false,
  },
  output: {
    file: 'dist/dist/previewInjectedCodeMain.js',
    format: 'es',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [pluginTypeScript],
    }),
    nodeResolve(),
  ],
}
