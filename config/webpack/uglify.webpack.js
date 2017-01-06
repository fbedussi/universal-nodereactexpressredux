const configs = {
  mangle: {},
  compress: {
    dead_code: true,
    warnings: false,
    sequences: true,
    properties: true,
    collapse_vars: true,
    drop_console: true,
    drop_debugger: true
  },
  beautify: {
    indent_start: 0,
    indent_level: 2,
    ascii_only: true,
    quote_keys: true
  }
};

module.exports = configs;
