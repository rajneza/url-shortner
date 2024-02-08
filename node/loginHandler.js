const User = require('./config/db');

// Handler function to authenticate login
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Check if the username exists in the database
        const user = await User.findOne({ username });
        if (!user) {
            console.error('User not found:', username);
            return res.status(404).send('User not found');
        }

        // Compare the passwords
        if (user.password !== password) {
            console.error('Incorrect password for user:', username);
            return res.status(401).send('Incorrect password');
        }

        // If username and password are correct, send a success response
        console.log('User logged in:', username);
        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error authenticating login:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = login;
