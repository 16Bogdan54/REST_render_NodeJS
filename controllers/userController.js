const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');

const readById = async (req, res) => {
    const id = req.params.userId;

   try {
       const user = await UserModel.findById(id);

       if(user) {
           return res.status(200).json({user})
       } else {
           return res.status(404).json({message: 'not found'});
       }

   } catch (err) {
       return res.status(500).json({ err })
   }
}

const readAll = async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.status(200).json({ users })
    } catch (err) {
        return res.status(500).json({err})
    }
}

const update = async (req, res) => {
    const id = req.params.userId;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            user.set(req.body);

            const savedUser = await user.save();
            return res.status(201).json({ user: savedUser });
        } else {
            return res.status(404).json({ message: 'not found' });
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteById = async (req, res) => {
    const id = req.params.userId;

    try {
        const user = await UserModel.findByIdAndDelete(id)

        if(user) {
            return res.status(201).json({user, message: 'User deleted successfully'})
        } else {
            return res.status(404).json({message: 'not found'})
        }

    } catch (err) {
        return res.status(500).json({err})
    }

}

module.exports = {
    create,
    readById,
    readAll,
    update,
    deleteById
}