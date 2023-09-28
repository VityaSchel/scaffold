export default {
  '$schema': 'https://json.schemastore.org/swcrc',
  'jsc': {
    'parser': {
      'syntax': 'typescript'
    },
    'target': 'es2017',
    'paths': {
      '@/*': ['src/*']
    }
  },
  'minify': true
}
