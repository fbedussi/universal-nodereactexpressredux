(function(w, d, head) {
  'use strict';

  function appendScript(src) {
    var res = '<script';

    res += ' ' +
      'async="false" ' +
      'src="' + src + '" ' +
      '>';

    /* eslint no-useless-escape: 0 */
    res += '<\/script>';
    return d.writeln(res);
  }

  window.Promise || appendScript('/assets/promise-polyfill.js');
  window.fetch || appendScript('/assets/fetch-polyfill.js');

})(window, document, document.head);
