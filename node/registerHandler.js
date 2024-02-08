// const mongoose = require('mongoose');

// // Define a schema for the registration data
// const registrationSchema = new mongoose.Schema({
//     username: { type: String, unique: true }, // Set the username field as unique
//     password: String
// });

// // Create a mongoose model based on the schema
// const Registration = mongoose.model('Registration', registrationSchema);

// // MongoDB connection URI
// const mongoURI = 'mongodb://127.0.0.1:27017/my_database'; // Update with your MongoDB URI

// // Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Handler function to save registration data
// async function register(req, res) {
//     const { username, password } = req.body;

//     try {
//         // Check if the username already exists
//         const existingUser = await Registration.findOne({ username });
//         if (existingUser) {
//             console.error('Username already exists:', username);
//             return res.status(400).send('Username already exists');
//         }

//         // Create a new registration document
//         const newRegistration = new Registration({ username, password });
//         // Save the document to the database
//         await newRegistration.save();
//         console.log('Registration data saved to MongoDB:', newRegistration);
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error saving registration data to MongoDB:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// }



// module.exports = register;
// const { Registration } = require('./config/db');

// const mongoose = require('mongoose');

// // Define a schema for the registration data
// const registrationSchema = new mongoose.Schema({
//     username: { type: String, unique: true }, // Set the username field as unique
//     password: String
// });

// // Create a mongoose model based on the schema
// const Registration = mongoose.model('Registration', registrationSchema);

// module.exports = Registration;

const User = require('./config/db');

async function register(req, res) {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.error('Username already exists:', username);
            return res.status(400).send('Username already exists');
        }

        // Create a new registration document
        const newRegistration = new User({ username, password });
        // Save the document to the database
        await newRegistration.save();
        console.log('Registration data saved to MongoDB:', newRegistration);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving registration data to MongoDB:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = register;

