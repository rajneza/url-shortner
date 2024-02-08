const User = require('./config/db');

async function urls(req, res){
    console.log(req.body)
    const { username } = req.body;
    console.log(username)
    try {
        // const user = await User.findOne({ Ram });
        const user = await User.findOne({ 'username': username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.urls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = urls