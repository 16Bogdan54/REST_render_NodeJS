const express = require('express');
const UserController = require('../controllers/userController')
const {Schemas, Validate} = require('../middleware/joi')

const userRouter = express.Router();

userRouter.post('/create',  Validate(Schemas.user.create), UserController.create);
userRouter.get('/get/:userId', UserController.readById);
userRouter.get('/get', UserController.readAll);
userRouter.patch('/update/:userId', Validate(Schemas.user.update), UserController.update);
userRouter.delete('/delete/:authorId', UserController.deleteById);
