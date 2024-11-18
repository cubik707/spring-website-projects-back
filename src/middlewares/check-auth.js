import * as TokenService from '../services/token-service.js';

export default async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const {userId} = TokenService.validateAccessToken(token);
    console.log(userId)
    if (!userId) {
      return res
        .status(401)
        .json({ message: 'Access token expired or invalid' });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
