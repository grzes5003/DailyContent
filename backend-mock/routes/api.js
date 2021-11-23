const express = require('express');
const cors = require('cors');
const router = express.Router();
const users = require('../resources/data');

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

router.get('/img/:images', function(req, res, next) {
    res.send(`PUT HTTP method on user/${req.params.images} resource`);
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
