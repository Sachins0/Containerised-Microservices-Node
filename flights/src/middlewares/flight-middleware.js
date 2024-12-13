const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'flightNumber not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.airplaneId){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'airplaneId not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'departureAirportId not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'arrivalAirportId not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'arrivalTime not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.departureTime){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'departureTime not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.price){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'price not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    if(!req.body.totalSeats){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'totalSeats not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    if(!compareTime(req.body.arrivalTime,req.body.departureTime)){
        ErrorResponse.message='Error while creating a flight';
        ErrorResponse.error= new AppError({explanation : 'arrival time should be more than departure time'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name && !req.body.code && !req.body.address){
        ErrorResponse.message='Error while updating the flight';
        ErrorResponse.error= new AppError({explanation : 'No change is found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

function validateUpdateSeatRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message='Error while updating the flight';
        ErrorResponse.error= new AppError({explanation : 'TotalSeats is not found in incoming req'},StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest,
    validateUpdateSeatRequest
}