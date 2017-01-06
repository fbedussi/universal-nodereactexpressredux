/* eslint no-console: 0 */
require('./build/node/application')()
  .then(data => {
    console.info(
      'Application:Starting.Done',
      JSON.stringify(data, null, 2)
    );
  })
  .catch(error => {
    console.error('Application:Starting.Error', error);
  })
;
