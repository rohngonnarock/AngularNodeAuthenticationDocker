var express = require('express')
var router = express.Router()
const User = require('../models/user');
const mongoose = require('mongoose');
const dbUrl = require('../config/db.config')
const jwt = require('jsonwebtoken');

mongoose.connect(dbUrl, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', (req, res) => {
    res.send(' home page')
})

router.get('/test', (req, res) => {
    res.send('API test page')
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(specialEvents)
})

// define the about route
router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token });
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send("invalid email");
            } else if (user.password !== userData.password) {
                res.status(401).send("invalid password");
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token })
            }
        }
    })
})

module.exports = router

//curl -H "Content-Type: application/json" -X POST -d {\"email\":\"mkyong\",\"password\":\"abc\"} http://localhost:8050/api/register/
//curl -H "Content-Type: application/json" -X POST -d {\"email\":\"mkyong\",\"password\":\"abc\"} http://localhost:8050/api/login/


