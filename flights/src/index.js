const express=require('express')

const {ServerConfig}= require('./config')
const apiRoutes= require('./routes');

const axios= require('axios');

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/callingBookingsService',async(req,res)=>{
    const response= await axios.get('http://localhost:3001/api/v1/info');
    console.log(response);
    return res.json({message: response.data});
})

app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
})