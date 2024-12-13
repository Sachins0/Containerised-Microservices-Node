const amqplib= require('amqplib');
const {RabbitMQ_URI, queue}= require('./server-config');

let channel, connection;

async function connectQueue(){
    try {
        connection= await amqplib.connect(RabbitMQ_URI);
        channel= await connection.createChannel();
        await channel.assertQueue(queue);
    } catch (error) {
        throw error;
    }
}

async function sendData(data){
    try {
        channel.sendToQueue(queue,Buffer.from(JSON.stringify(data)));
    } catch (error) {
        throw error;
    }
}

module.exports= {
    connectQueue,
    sendData
}