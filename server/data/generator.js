// generate the random data to each new registered user
const fs = require('fs');

// generates a new day in milliseconds
function getDate(index) {
    const startDate = new Date(2015, 0, 1);
    const dayOffset = 24 * 60 * 60 * 1000 * index + 1;
    return +new Date(startDate.getTime() + dayOffset);
}

// random number generation with a min-max random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// generation function to export creates a user .json file and saves in into the DB
module.exports = function(id) {

    const dataUser = {
        hourly: Array(24).fill(0).map(elem => +(Math.random() * 3).toFixed(2)),
        monthly: Array(2).fill(0).map(elem => +(getRandomInt(100, 200)).toFixed(2)),
        yearly: Array(810).fill(0).map((elem, i) => [getDate(i), +(Math.random() * 10).toFixed(2)])
    };

    const jsonToWrite = JSON.stringify(dataUser, null, 4);

    //Creates a file for each new user
    const folderPath = __dirname + '/users/';
        fs.writeFileSync(folderPath + id + ".json", jsonToWrite);
        console.log(`data.json was created at ${folderPath}!`);

    //Stores the data into the DB
    const User = require(__base + 'models/User');

    User.findByIdAndUpdate(id, { dataUser })
        .then(user => {
            console.log('user has been updated succesfully');
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));

    return dataUser;

};

