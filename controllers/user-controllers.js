import User from '../models/user-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';


export const getAllUsers = (req,res,next) => {
    res.json({message: "user info"});
}

export const getUsersById = function(req,res,next) {
    const {id} = req.params;
    res.json({message: `user with id: ${id} info`});
}

export const createUsers = asyncWrapper(async (req,res,next) => {
    const {username, password, role, name} = req.body;
    const existUser = await User.findOne({username});
    if(existUser){
        return res.status(400).json({message: 'username is already taken'});
    }

    const user = await User.create({username, password, role, name});
    if(user)
    {
        return res.status(201).json({message: "user created"});
    }
    return res.status(500).json({message: 'failed to create user'});
} )

export const updateUsers = function(req,res,next) {
    res.json({message: "user updated"});
}

export const deleteUsers = function(req,res,next) {
    res.json({message: "user deleted"});
}