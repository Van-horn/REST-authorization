const express = require('express');

const userController = require('../controllers/user-controller');
//const accessTokenMiddleware = require('../middlewares/accessTokenMiddleware');
//  const refreshTokenMiddleware = require('../middlewares/refreshTokenMiddleware');
// const storeItemController = require('../controllers/storeItem-controller');

const router = express.Router();

router.patch('/user/logout',userController.logout);
router.post('/user/registration',  userController.registration);
router.patch('/user/login',  userController.login);
router.patch('/user/refresh', userController.refresh);
router.patch('/user/forgotPassword', userController.forgotPassword);
// router.get('/users', userController.getUsers);
// router.put('/forgotPassword', userController.forgotPassword);
// router.get(
//   '/refreshFavorites',
//   accessTokenMiddleware,
//   userController.refreshFavorites
// );
// router.get(
//   '/refreshRatings',
//   accessTokenMiddleware,
//   userController.refreshRatings
// );

// router.post('/getItem', storeItemController.getItem);
// router.post(
//   '/createProduct',
//   accessTokenMiddleware,
//   storeItemController.createItem
// );
// router.post('/getStoreItems', storeItemController.getStoreItems);
// router.patch(
//   '/setFavorite',
//   accessTokenMiddleware,
//   storeItemController.setFavorite
// );
// router.patch(
//   '/removeFavorite',
//   accessTokenMiddleware,
//   storeItemController.removeFavorite
// );

module.exports = router;
