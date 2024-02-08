const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Protected route example
router.get('/protected', authenticate, (req, res) => {
  // This route is protected by the authenticate middleware
  res.send('Protected route');
});

module.exports = router;
