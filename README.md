README.md
# Elecons
Elecons is the final project of the Skylab Coders bootcamp. This project aims to facilitate the user to track and reduce its electric consumption, compare himself to last year period, compare its savings to neighbours, see what hour the electricity is cheaper, etc...

It can be seen in: https://eleconsum.herokuapp.com/ (stable version) and https://engiebuddy.herokuapp.com/ (beta version)

This demo assigns a randomly generated electricity consumption data to any register users. This data is both real-time data simluating the instant power and fixed data simulating the hourly, daily and monthly electricity consumption.
It uses the Red Eléctrica Española (REE) API, to show the Spanish hourly electricity prices.

##Endpoints for Spain Energy prices
You need a `token` (you can request it sending an email to: `consultasios@ree.es`)and it has to be included in the header of the request. The API documentation can be found in https://api.esios.ree.es/: 
- To obtain the PVPC: https://api.esios.ree.es/indicators/10229
- To obtain the PVPC DH: https://api.esios.ree.es/indicators/10230
- To obtain the PVPC EV: https://api.esios.ree.es/indicators/10231

```
    url: `https://api.esios.ree.es/indicators/${indicator}`, 
    headers: {
        "Accept": "application/json; application/vnd.esios-api-v1+json",
        "Content-Type" : "application/json",
        "Authorization": 'Token token="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"',
    },
    dataType: 'json',
    }
```

##Endpoints for real-time power
It is a web-service that generates an random instant power value in Watts every second, and it has 5 instances, that have different maximum powers assigned, so their random values will be between 0 and the value assigned:
- `http://fran.noip.me:8888/consumo?id=0001` --> Power assigned: 5,50kW
- `http://fran.noip.me:8888/consumo?id=0002` --> Power assigned: 3,30kW
- `http://fran.noip.me:8888/consumo?id=0003` --> Power assigned: 8,80kW
- `http://fran.noip.me:8888/consumo?id=0004` --> Power assigned: 4,40kW
- `http://fran.noip.me:8888/consumo?id=0005` --> Power assigned: 5,50kW

## Technologies
It is a `MEAN project`, where the server-side is an `Express` app and the front-end is server in an `Angular app`.
- It uses `websockets` to instantianlly show the real-time data from the external-web service.
- Regarding the charts the are build by using the `Highcharts` library
- The MongoDB is stored in [Mlab](www.mlab.com)

##Installation

To run it locally you should an `.env` with the following variables:
```
PORT=XXXX
DB_URI=mongodb://localhost:27017/XXXXX
SECRET=XXXXXXXXXXXXXXXX
```

Once done that you can run the project by typing:
`npm start`

To run remotely, using `Heroku`, it has to be configured as follows:
```
heroku config:set DB_URI=mongodb://<%USER%>:<%PASS%>@XXXXXXXXX.mlab.com:00000/xxxxxxxxxxx
heroku config:set ENVIRONMENT=production
heroku config:set SECRET=XXXXXXXXXXXXXXX
```