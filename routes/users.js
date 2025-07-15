const express = require('express');
const router = express.Router();
const {getAllUsers, getUsersById, createUsers, updateUsers, deleteUsers} = require('../middlewares/user-middleware')

router.get("/", getAllUsers);

router.get("/:id", getUsersById);

router.post("/", createUsers);

router.patch("/", updateUsers);

router.delete("/:id", deleteUsers);

module.exports = router;