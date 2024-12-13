const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message='Error while creating an airplane';
        ErrorResponse.error= new AppError({explanation : 'Model Number not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.capacity){
        ErrorResponse.message='Error while updating the airplane';
        ErrorResponse.error= new AppError({explanation : 'Capacity not found in incoming req'},StatusCodes.BAD_REQUEST);
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