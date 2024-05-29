const router = require('express').Router();
const { authController } = require('../controllers');
const { passport } = require('../config/passportconfig');

router.post('/signup', authController.createUser)
router.post('/login', authController.loginUser)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const token = jwt.sign({ userId: req.user.uuid }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: "user loggedin successfully" });
});

module.exports = router;