import {match} from 'react-router';
import {RoutesTree as routes} from 'RoutesTree';

export function RouteMatcherMiddleware(req, res, next) {
  return match(
    {routes, location: req.url},

    (error, redirectLocation, renderProps) => {
      if(error) {
        return next(error);
      }

      if(redirectLocation) {
        let {pathname, search} = redirectLocation;

        return res.redirect(302, `${pathname}${search}`);
      }

      if(!renderProps) {
        // Do Something with a 404
        return res.status(404).end();
      }

      res.viewModel.__RENDERPROPS__ = renderProps;
      next();
    }
  );
}
