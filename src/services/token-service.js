import jwt from 'jsonwebtoken';

export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '15d',
  });

  return { accessToken, refreshToken };
};

export const refreshAccessToken = (refreshToken) => {
  try {
    const refreshDecoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    return jwt.sign(
      { username: refreshDecoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    return null;
  }
};
