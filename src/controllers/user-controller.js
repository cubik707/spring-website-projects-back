import User from '../models/user.js';
import { generateTokens } from '../services/token-service.js';
import * as TokenService from "../services/token-service.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    const { accessToken, refreshToken } = generateTokens(user);

    TokenService.setRefreshTokenCookie(res, refreshToken);
    return res.status(200).json({
      accessToken
    });
  } catch (err) {
    console.error(err);
    // Send 500 for any unexpected errors
    res.status(500).json({
      message: 'An unexpected error occurred',
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, firstName, lastName, age } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    const newUser = await User.create({
      username,
      password,
      firstName,
      lastName,
      age,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    TokenService.setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      accessToken,
      ...newUser.dataValues,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};
