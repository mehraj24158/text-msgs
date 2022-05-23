const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async (req, res, next) => {

    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') ) {
        
        try {

            token = req.headers.authorization.split(' ')[1]
            
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await
        }
        catch (err){
            res.status(401)
            throw new Error('Not Authorized')

        }

    }


})