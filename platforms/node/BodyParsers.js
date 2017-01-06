import bodyParser from 'body-parser';

export function decorate(app) {

  let json = bodyParser.json({
    limit: '300kb',
    inflate: true,
    strict: true
  });


  app
    .use(json)
  ;

  return app;
}
