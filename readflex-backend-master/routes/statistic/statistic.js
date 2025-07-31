const router = require('express').Router();
const {getStatistics} = require('../../controllers/statistic/statistic.controller');

router.get('/', getStatistics);
module.exports = router;