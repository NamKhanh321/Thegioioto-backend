

const getAllUsers = function(req,res,next) {
    res.json({message: "user info"});
}

const getUsersById = function(req,res,next) {
    const {id} = req.params;
    res.json({message: `user with id: ${id} info`});
}

const createUsers = function(req,res,next) {
    res.json({message: "user created"});
}

const updateUsers = function(req,res,next) {
    res.json({message: "user updated"});
}

const deleteUsers = function(req,res,next) {
    res.json({message: "user deleted"});
}

module.exports = {getAllUsers,getUsersById, createUsers, updateUsers, deleteUsers};