import { NOT_AUTHENTICATED, PUBLIC_ROUTES } from "../util/consts.js";

export default (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  if (PUBLIC_ROUTES.includes(fullPath)) {
    return next();
  }
  if (req.session.userId) {
    return next();
  }
  return res.json({ auth: false, error: NOT_AUTHENTICATED });
};
