const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define URL schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

//API endpoint for shortening URL
app.post('/shorten', async (req, res) => {
  console.log("hii")
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    // Save original and shortened URL to database
    await Url.create({ originalUrl, shortUrl });
    res.json({ originalUrl, shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for redirecting to original URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Find the original URL by the short URL
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const shortid = require('shortid');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const urlSchema = new mongoose.Schema({
//   originalUrl: String,
//   shortUrl: String,
// });

// const Url = mongoose.model('Url', urlSchema);

// app.post('/api/data', async (req, res) => {
//     const { originalUrl } = req.body;
//     const shortUrl = shortid.generate();
//     console.log('Short URL:', shortUrl);

//     try {
//     // Save original and shortened URL to database
//     await Url.create({ originalUrl, shortUrl });
//     res.json({ originalUrl, shortUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
    
//     // Send the modified value back to the frontend
//     //res.json({ newValue });
// });
// app.get('/:shortUrl', async (req, res) => {
//     const { shortUrl } = req.params;
  
//     try {
//       // Find the original URL by the short URL
//       const url = await Url.findOne({ shortUrl });
//       if (!url) {
//         return res.status(404).json({ error: 'URL not found' });
//       }
//       res.redirect(url.originalUrl);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
