require('./build/node/application')()
  .then(([info, app]) => {
    app.get('logger').info('Application:Starting.Done', info);
  })
  .catch(([error, app]) => {
    app.get('logger').error('Application:Starting.Error', error);
  })
;
