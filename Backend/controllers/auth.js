const asyncWrapper = require('../middlewares/async')
const User = require('../models/users')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = asyncWrapper(async(req, res, next) => {
    // console.log(req.body)
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
})

const login = asyncWrapper(async(req, res, next) => {
    // console.log(req.body)
    const {email, password} = req.body

    if (!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})

    if (!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
})

module.exports = {register, login}