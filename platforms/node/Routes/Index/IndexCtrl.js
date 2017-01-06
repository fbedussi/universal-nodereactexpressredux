export function IndexCtrl(req, res) {

  return Promise
    .resolve()
    .then(() => res.viewModel)
    .then(model => res.render('Index/Index', model))
  ;
}
