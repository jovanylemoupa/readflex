const router = require('express').Router();
const { getUsers } = require('../../controllers/user/user.controller');

router.get('/', getUsers);
module.exports = router;