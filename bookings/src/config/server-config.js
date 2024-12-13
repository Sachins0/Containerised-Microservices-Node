const dotenv=require('dotenv')
dotenv.config()

module.exports={
    PORT:process.env.PORT,
    FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
    RabbitMQ_URI: process.env.RabbitMQ_URI,
    queue: process.env.queue,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL
}