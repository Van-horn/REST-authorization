const express = require('express');

const userController = require('../controllers/user-controller');
// const storeItemController = require('../controllers/storeItem-controller');

const router = express.Router();

;
router.post('/user/userById',  userController.userById);
router.post('/user/userByEmail',  userController.userByEmail);
router.post('/user/userToken',  userController.userToken);

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
