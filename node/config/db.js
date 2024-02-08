const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/my_database'; // Update with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    urls: [{
        originalURL: String,
        shortURL: String
    }]
});

const User = mongoose.model('User', UserSchema, 'users'); // 'registrations' is the collection name

module.exports = User;
