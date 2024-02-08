const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const auth = require('../middleware/authenticate');
const URL = require('../models/URL');

// @route   POST /api/url/shorten
// @desc    Shorten a URL
// @access  Private
router.post('/shorten', auth, async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl) || !validUrl.isUri(originalUrl)) {
    return res.status(400).json({ msg: 'Invalid URL' });
  }

  const urlCode = shortid.generate();

  try {
    let url = await URL.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = baseUrl + '/' + urlCode;

      url = new URL({
        originalUrl,
        shortUrl,
        urlCode,
        user: req.user.id
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /:code
// @desc    Redirect to original URL
// @access  Public
router.get('/:code', async (req, res) => {
  try {
    const url = await URL.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ msg: 'URL not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
