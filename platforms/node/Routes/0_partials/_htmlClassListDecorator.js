(function(w, d, html) {
  'use strict';

  d.addEventListener('DOMContentLoaded', function() {
    html.classList.remove('dom-waiting');
    html.classList.add('dom-loaded');
  });
  w.addEventListener('load', function() {
    html.classList.remove('win-waiting');
    html.classList.add('win-loaded');
  });

})(window, document, document.documentElement);
