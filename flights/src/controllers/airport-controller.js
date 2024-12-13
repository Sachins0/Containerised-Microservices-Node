const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common')

/**
 * POST : /airports 
 * req-body {name: 'IGI', code: 'DEL, address: '', cityId: ,}
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data=airport
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
 * GET : /airports 
 * req-body {}
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data=airports;
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
 * GET : /airports/:id
 * req-body {}
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airport;
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
 * DELETE : /airports/:id 
 * req-body {}
 */
async function deleteAirport(req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data=airport;
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
 * PATCH : /airports/:id 
 * req-body {name: 'IGI', code: 'DEL, address: ''}
 */
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id,
            {
                name: req.body.name,
                code: req.body.code,
                address: req.body.address,
            }
        );
        SuccessResponse.data=airport;
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
    createAirport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
}