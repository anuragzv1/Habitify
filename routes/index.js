const express = require('express');

const router = express.Router();

router.get('/', require('../controllers/index_controller').index);
router.post('/createhabit',require('../controllers/habit_controller').createhabit);
router.get('/habit',require('../controllers/viewhabit_controller'));
router.post('/togglestate', require('../controllers/viewhabit_controller').togglestate);

module.exports = router;