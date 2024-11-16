import User from "../models/user.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    return res.status(200).json({ token: 'fake-token' });
  } catch (err) {
    console.error(err);
    // Send 500 for any unexpected errors
    res.status(500).json({
      message: 'An unexpected error occurred',
    });
  }
};
