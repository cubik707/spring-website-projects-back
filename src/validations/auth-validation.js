import { body } from 'express-validator';

export const loginValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
];

export const signupValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least 1 number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least 1 letter'),
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),
  body('age')
    .isInt({ gt: 0 })
    .withMessage('Age must be a number greater than zero'),
];
