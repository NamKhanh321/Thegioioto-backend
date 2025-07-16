import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({quiet: true});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must provide an username'],
        trim: true,
        maxlength: [20, 'Username must be least than 20 characters']
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],
    },
    role: {
        type: String,
        required: [true, 'You must provide a user role'],
        enum: ['admin', 'customer', 'staff']
    },
    name: {
        type: String,

    }

}, {timestamps: true});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

userSchema.methods.checkPassword = async function(password) {
    const isMatched = await bcrypt.compare(password, this.password);
    return isMatched;
}

export default mongoose.model('User', userSchema);