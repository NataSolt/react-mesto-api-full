const router = require('express').Router();

const {
  getUsers, getUserById, getUser, patchUser, patchAvatar,
} = require('../controllers/users');
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, patchUser);
router.patch('/me/avatar', validateUpdateAvatar, patchAvatar);

module.exports = router;
