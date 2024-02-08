const mongoose = require('mongoose');

// Define a schema for the registration data
const registrationSchema = new mongoose.Schema({
    username: { type: String, unique: true }, // Set the username field as unique
    password: String
});

// Create a mongoose model based on the schema
const Logging = mongoose.model('Registration', registrationSchema);

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/my_database'; // Update with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await Logging.findOne({ username, password });
        if (existingUser) {
            console.error('Username already exists:', username);
            return res.status(400).send('Username already exists');
        }
        
    } catch (error) {
        console.error('Error saving registration data to MongoDB:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = login;