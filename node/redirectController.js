const User = require('./config/db');

async function redirect(req, res) {
  try {
    const { shortURL } = req.params;

    // Find the user with the matching shortURL
    const user = await User.findOne({ 'urls.shortURL': shortURL });

    if (!user) {
      console.log('Short URL not found');
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Find the URL with matching shortURL
    const url = user.urls.find(url => url.shortURL === shortURL);

    // Redirect to the original URL
    res.redirect(url.originalURL);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = redirect;
