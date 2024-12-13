const express=require('express');

const rateLimit= require('express-rate-limit');
const {createProxyMiddleware}= require('http-proxy-middleware');

const {ServerConfig, Logger}= require('./config');
const apiRoutes= require('./routes');

const app=express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 3, // Limit each IP to 3 requests per `window` (here, per 2 minutes).
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use('/api',apiRoutes);

app.use('/flightsService',createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE, // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
  }));
app.use('/bookingsService',createProxyMiddleware({target: ServerConfig.BOOKING_SERVICE, changeOrigin: true}));

app.listen(ServerConfig.PORT,async()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
})