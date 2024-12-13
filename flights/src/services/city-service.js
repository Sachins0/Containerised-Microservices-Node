const {StatusCodes} = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>explanation.push(err.message));
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch(error) {
        throw new AppError('Cannot get requested city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested city can not be found',error.statusCode);
        }
        throw new AppError('Cannot get requested city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested city to delete can not be found',error.statusCode);
        }
        throw new AppError('Cannot delete the given City object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data) {
    try {
        const city = await cityRepository.update(id,data);
        return city;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Requested city to update can not be found',error.statusCode);
        }
        throw new AppError('Cannot update the given City object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}