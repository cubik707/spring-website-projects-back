import { body } from 'express-validator';

export const loginValidation = [
  body('username')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
];
