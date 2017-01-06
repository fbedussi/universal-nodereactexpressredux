import {
  DLL
} from 'config/build.config';

export function CreateViewModelMiddleware(req, res, next) {
  res.viewModel = Object.create(null);

  res.viewModel.__HEAD__ = Object.create(null);
  res.viewModel.__INITIAL_STATE__ = null;
  res.viewModel.__PRERENDERED_HMTL__ = '';
  res.viewModel.DLL = DLL;

  return next();
}
