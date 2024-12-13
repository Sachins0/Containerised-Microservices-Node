const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common')

/**
 * POST : /flights 
 * req-body {flightNumber: 'AI-859', 
 * airplaneId: 7,
 * departureAirportId: 'BOM',
 * arrivalAirportId: 'DEL',
 * arrivalTime: 2024-10-04 13:30:10,
 * departureTime: 2024-10-04 15:30:10,
 * price: 4101,
 * boardingGate: 'T2',
 * totalSeats: 120}
 */
async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        SuccessResponse.data=flight
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data=flights
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * GET : /flights/:id
 * req-body {}
 */
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data=flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * PATCH : /flights/:id 
 * req-body {capacity: 250}
 */
async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats(
            {
                flightId: req.params.id,
                seats: req.body.seats,
                dec: req.body.dec
            }
        );
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}