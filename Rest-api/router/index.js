const router = require('express').Router();
const users = require('./users');
const brands = require('./brands');
const models = require('./models');
const generations = require('./generations');
const specifications = require('./specifications');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/brands', brands);
router.use('/models', models);
router.use('/generations', generations);
router.use('/specifications', specifications);

module.exports = router;
