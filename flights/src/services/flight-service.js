const {StatusCodes} = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name=='SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err)=>explanation.push(err.message));
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter={};
    const endingTripTime= " 23:59:00";
    let sortFilter = [];
    //trips=BOM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId]=(query.trips).split("-");
        if(departureAirportId==arrivalAirportId){
            throw new AppError('Departure and arrival airports should be different',StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }

    if(query.price){
        [minPrice,maxPrice]=(query.price).split("-");
        if(maxPrice<=minPrice){
            throw new AppError('Max price should be greater than min price',StatusCodes.BAD_REQUEST);
        }
        customFilter.price={
            [Op.between]: [minPrice,((maxPrice==undefined)?20000: maxPrice)]
        }
    }

    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]: [query.tripDate,query.tripDate + endingTripTime]
        }
    }

    if(query.sort){
        const params= (query.sort).split(",");
        const sortFilters= params.map((param)=>param.split("_"));
        console.log(sortFilters);
        sortFilter = sortFilters;
    }

    try {
        const flights= await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested flight can not be found',error.statusCode);
        }
        throw new AppError('Cannot get requested flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try {
        const response= await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update data of requested flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}