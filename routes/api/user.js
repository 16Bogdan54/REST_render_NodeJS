const express = require('express');
const UserController = require('../../controllers/userController')
const {Schemas, Validate} = require('../../middleware/joi')

const userRouter = express.Router();

userRouter.get('/get/:userId', UserController.readById);
userRouter.get('/get', UserController.readAll);
userRouter.patch('/update/:userId', Validate(Schemas.user.update), UserController.update);
userRouter.delete('/delete/:userId', UserController.deleteById);

module.exports = userRouter