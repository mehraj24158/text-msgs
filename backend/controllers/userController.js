const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const login = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body

    const user = User.findOne({email})

    const validPS = await bcrypt.compare(user.password, password)

    if (user && validPS) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: createToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Login")
    }

})

const register = asyncHandler(async (req, res) => {

    //
    const {email, name, password} = req.body

    if (!email || !name || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Email is already registered')
    }


    const salt = bcrypt.genSalt()
    const hashedPS = bcrypt.hash(password, salt)
    
    const user = await User.create({name, email, password:hashedPS})

    if (user) {
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:createToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

const createToken = (id) => {
    const token = jwt.sign(id, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token
}

module.exports = {login, register}
