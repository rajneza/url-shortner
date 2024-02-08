const shortid = require('shortid');
const User = require('./config/db');

async function shortID(req, res) {
  try {
    const { originalURL, username, password } = req.body;
    console.log(req.body)
    // Search for user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate short URL
    const shortURL = shortid.generate();

    // Add new URL pair to user's document
    user.urls.push({ originalURL, shortURL });
    await user.save();
    console.log("hello")
    res.json({ originalURL, shortURL });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = shortID;
