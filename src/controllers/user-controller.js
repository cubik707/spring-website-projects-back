import User from '../models/user.js';
import { generateTokens } from '../services/token-service.js';
import * as TokenService from "../services/token-service.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    const { accessToken, refreshToken } = generateTokens(user.id);

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

    const { accessToken, refreshToken } = generateTokens(newUser.id);

    TokenService.setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      accessToken,
      user: {...newUser.dataValues} ,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};
