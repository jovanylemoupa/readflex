const router = require('express').Router();

router.use('/books', require('./book/book'));
router.use('/users', require('./user/user'));
router.use('/statistics', require('./statistic/statistic'));

module.exports = router;