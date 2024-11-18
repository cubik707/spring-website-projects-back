import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Map the array of error objects into a more usable format
    const formattedErrors = errors.array().reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});

    return res.status(400).json({ errors: formattedErrors });
  }

  next();
};
