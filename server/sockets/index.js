const request = require('request');
const moment = require('moment')


var connections = []

function setSocketEvents(io) {

    //it launches the 'connection' and  will run the function
    io.sockets.on('connection', function(socket) {
        connections.push(socket);
        console.log(`Connected: ${connections.length} sockets connected`);

        // Listens the 'userInfo' event from the client
        socket.on("userInfo", function(data) {
            
            // creates an individual socket per id
            socket.join(data.id);
            socket.url = data.urlCurrentPower;
            
            request(socket.url, (error, response, body) => {

                //parsing the webservice and transform it to an object
                let bodyParsed = body.replace(/\n/g, '');
                let current = bodyParsed.substring(bodyParsed.indexOf(':') + 1);
                let accumulated = bodyParsed.substring(0, bodyParsed.indexOf(':'));

                let newRead = {
                    date: moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'),
                    current: +current,
                    accumulated: +accumulated
                };

                //Emits an event "new read" the data to the sockets with the specified 'id' using .in
                io.sockets.in(data.id).emit('new read', newRead);
            });
        });
            
        //Message when a socket is disconnected and recount
        socket.on('disconnect', function(data) {
            connections.splice(connections.indexOf(socket), 1)
            console.log('Disconnected: %s sockets connected', connections.length);
            });
    });
}

module.exports = setSocketEvents
