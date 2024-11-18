import * as TokenService from '../services/token-service.js';

export const refreshToken = async (req, res) => {
  try {
    console.log('Cookies:', req.cookies);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: 'No refresh token provided' });
    }

    const newAccessToken = TokenService.refreshAccessToken(refreshToken);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
