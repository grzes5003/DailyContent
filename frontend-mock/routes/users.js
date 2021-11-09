const express = require('express');
const router = express.Router();
const users = require('../resources/data');


/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log("req: ", req.headers);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.headers && req.headers.authorization === 'Bearer fake-jwt-token') {
    res.status(200).send({ok: true, text: users});
  } else {
    // return 401 not authorised if token is null or invalid
    res.status(401).send('Unauthorised');
  }
});

module.exports = router;
