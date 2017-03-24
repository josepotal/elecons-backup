const User = require(__base + 'models/User');

//import generation function
const generateData = require(__base + 'data/generator.js');

function register(req, res) {

    // store the username and password 
    const { username, password } = req.body;
    const account = new User({ username });

    User.register(account, password, (err, user) => {
        if (err) {
            return res.json({ success: false, msg: 'Username already exists.' });
        }

        //generate data to each new user
        let id = user._id;
        const dataUser = generateData(id);

        res.json({ success: true, msg: 'Successful created new user.' });
    });

}

module.exports = register;
