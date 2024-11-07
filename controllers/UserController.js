export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if credentials are correct
    if (username === 'admin' && password === '1234') {
      return res.status(200).json({ token: 'fake-token' });
    } else {
      // Respond with 401 if credentials are invalid
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

  } catch (err) {
    console.error(err);
    // Send 500 for any unexpected errors
    res.status(500).json({
      message: 'An unexpected error occurred',
    });
  }
};
