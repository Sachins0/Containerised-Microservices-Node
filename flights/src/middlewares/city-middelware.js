const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Error while creating a city';
        ErrorResponse.error= new AppError({explanation : 'Name not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Error while updating the city';
        ErrorResponse.error= new AppError({explanation : 'Name not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}