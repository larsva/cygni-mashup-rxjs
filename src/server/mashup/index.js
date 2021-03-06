let express = require('express');
let controller = require('./mashup.controller');

let router = express.Router();

router.get('/:mbid', controller.lookup);

module.exports = router;