export default {
  '$schema': 'https://json.schemastore.org/swcrc',
  'jsc': {
    'parser': {
      'syntax': 'typescript'
    },
    'target': 'es2017',
    'baseUrl': '.',
    'paths': {
      '@/*': ['src/*']
    }
  },
  'minify': true
}
