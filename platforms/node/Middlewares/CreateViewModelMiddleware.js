import {
  DLL,
  MAIN_ENTRY_FILENAME
} from 'config/build.config';

export function CreateViewModelMiddleware(req, res, next) {
  res.viewModel = Object.create(null);

  res.viewModel.__HEAD__ = Object.create(null);
  res.viewModel.__INITIAL_STATE__ = null;
  res.viewModel.__PRERENDERED_HMTL__ = '';
  res.viewModel.DLL = DLL;
  res.viewModel.MAIN_ENTRY = MAIN_ENTRY_FILENAME;

  /* eslint no-undef: 0 */
  res.viewModel.ASSETS = __WEBPACK_DEFINED_PUBLICPATH__;
  res.viewModel.CSS = __WEBPACK_DEFINED_CSSPATH__;

  return next();
}
