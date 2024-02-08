// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const app = express();
// const protectedRoutes = require('./routes/protectedRoutes');




// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json({ extended: false }));
// app.use(cors());

// // Routes
// app.use('/api/register', require('./routes/auth'));
// app.use('/api/url', require('./routes/url'));
// app.use('/api', protectedRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const register = require('./registerHandler'); // Import the register function
const login = require('./loginHandler'); // Import the login function
const dashboard = require('./dashboard')
const { mongoose } = require('./config/db');
const shortenUrlHandler = require('./shortenController')
const redirectUrlHandler = require('./redirectController')
const url = require('./urls')

// const mongoose = require('mongoose');

const app = express();
app.use(cors());
const PORT = 5000;

//mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true });
//const User = mongoose.model('User', { username: String, password: String });


app.use(bodyParser.json());

// app.use('/login', userRoutes)
// app.post('/register', registerHandler);

app.post('/register', register);

// Login endpoint
app.post('/login', login);
app.post('./dashboard', dashboard)
app.post('/api/shorten', shortenUrlHandler);

// API endpoint to redirect to original URL
app.get('/:shortURL', redirectUrlHandler);
app.post('/api/users', url)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

