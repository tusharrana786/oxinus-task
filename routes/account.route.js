const router = require('express').Router();
const { accountController } = require('../controllers');

router.get('/', accountController.getAllAccounts)
router.get('/:id', accountController.getAccount)
router.post('/', accountController.addAccount)
router.put('/', accountController.updateAccount)
router.delete('/', accountController.removeAccount)

module.exports = router;