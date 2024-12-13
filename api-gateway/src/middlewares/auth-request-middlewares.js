const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

function validateAuthRequest(req,res,next){
    if(!req.body.email){
        ErrorResponse.message='Error while authenticating the user';
        ErrorResponse.error= new AppError({explanation : 'Email not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.password){
        ErrorResponse.message='Error while authenticating the user';
        ErrorResponse.error= new AppError({explanation : 'passsword not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

async function checkAuth(req,res,next){
    try {
        const response= await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response){
            req.user= response;
            next()
        }
    } catch (error) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error)
    }
}

async function isAdmin(req, res, next){
    const response= await UserService.isAdmin(req.user);
    if(!response){
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: 'User not authorized for this action'});
    }
    next();
}

module.exports={
    validateAuthRequest,
    checkAuth,
    isAdmin
}