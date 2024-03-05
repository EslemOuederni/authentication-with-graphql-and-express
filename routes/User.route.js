const userRouter = require('express').Router();
const userController = require('../controllers/User.controller');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/all',userController.allUsers);
userRouter.get('/info',userController.userInformation);

module.exports = userRouter;