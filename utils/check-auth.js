export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token === 'fake-token') {
    next();
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
