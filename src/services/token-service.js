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
      { userId: refreshDecoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const validateAccessToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    return payload;
  } catch (e) {
    console.log(e)
    return null;
  }
};

export const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
