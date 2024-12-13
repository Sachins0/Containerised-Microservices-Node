const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Error while creating an airport';
        ErrorResponse.error= new AppError({explanation : 'Name not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message='Error while creating an airport';
        ErrorResponse.error= new AppError({explanation : 'Airport Code not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.cityId){
        ErrorResponse.message='Error while creating an airport';
        ErrorResponse.error= new AppError({explanation : 'City Id not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name && !req.body.code && !req.body.address){
        ErrorResponse.message='Error while updating the airplane';
        ErrorResponse.error= new AppError({explanation : 'No change is found in incoming req'},StatusCodes.BAD_REQUEST);
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