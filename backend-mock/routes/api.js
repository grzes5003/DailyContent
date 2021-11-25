const express = require('express');
const cors = require('cors');
const router = express.Router();
const users = require('../resources/data');
const fs = require("fs");
const stream = require("stream");

let corsOptions = {
    origin: true,
    credentials: true
};

router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

router.use(cors(corsOptions))

router.get('/hello', function(req, res, next) {
    res.send('api works');
});

router.get('/img/all', function(req, res, next) {
    const r = fs.createReadStream('C:\\Users\\xgg\\WebstormProjects\\DailyContent\\backend-mock\\public\\images\\0.jpg') // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res)
});

router.get('/img/:image', function(req, res, next) {
    const r = fs.createReadStream(`C:\\Users\\xgg\\WebstormProjects\\DailyContent\\backend-mock\\public\\images\\${req.params.image}.jpg`) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res)
});

router.post('/auth/login', function(req, res, next) {
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
        res.status(401).send('Username or password is incorrect');
    }

    let filteredUsers = users.filter(user => {
        return user.username === req.body.username && user.password === req.body.password;
    });

    if (filteredUsers.length) {
        // if login details are valid return user details and fake jwt token
        let user = filteredUsers[0];
        let responseJson = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        };

        res.cookie('token', 'more-fake-jwt-token', {httpOnly: true});
        console.log("RESP: ", JSON.stringify(responseJson));
        res.status(200).send(responseJson);
    } else {
        // else return error
        res.status(401).send('Username or password is incorrect');
    }
});


module.exports = router;
