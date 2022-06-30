const express = require('express');
const {downloadCSV} = require('../controllers/csvController');
const router = express.Router();
// csv download
router.get('/downloadcsv',downloadCSV);

module.exports = router;