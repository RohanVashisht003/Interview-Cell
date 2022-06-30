const express = require('express');
const {downloadCSV} = require('../controllers/csvController');
const passport  = require('passport');
const router = express.Router();
// csv download
router.get('/downloadcsv',passport.checkAuthentication,downloadCSV);

module.exports = router;