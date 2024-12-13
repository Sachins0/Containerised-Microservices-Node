const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const { where, col } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response= await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetails',
                },
                {
                    model: Airport,
                    required: true,
                    on: {
                        col1: where(col('Flight.departureAirportId'), '=', col('departureAirportDetails.code'))
                    },
                    as: 'departureAirportDetails',
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    required: true,
                    on: {
                        col1: where(col('Flight.arrivalAirportId'), '=', col('arrivalAirportDetails.code'))
                    },
                    as: 'arrivalAirportDetails',
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ]
        });
        return response; 
    }

    async updateRemainingSeats(flightId, seats, dec=true){
        const transaction= await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight= await Flight.findByPk(flightId);
            let response;
            if(dec==true){
                response= await flight.decrement('totalSeats',{by: seats},{transaction: transaction});
            }
            else{
                response= await flight.increment('totalSeats',{by: seats},{transaction: transaction});
            }
            
            await transaction.commit();
            await flight.reload();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
        
    }
}
module.exports = FlightRepository;