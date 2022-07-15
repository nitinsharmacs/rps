const restrict = (req, res, next) => {
  if (req.session.gameId) {
    return next();
  }

  res.status(401).end('Unauthorized Access');
};

module.exports = { restrict };
