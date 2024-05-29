const { authenticateUser } = require('../middleware/auth');
const { passport } = require('../config/passportconfig.js')

const router = require('express').Router();

router.use('/auth', require('./auth.route.js'));
router.use('/account', authenticateUser, require('./account.route.js'));

module.exports = router;