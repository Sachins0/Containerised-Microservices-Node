const express= require('express');
const { InfoController } = require('../../controllers');
const userRoutes= require('./user-routes');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router=express.Router();

router.use('/user', userRoutes);

router.get('/info', AuthRequestMiddlewares.checkAuth, InfoController.info);

module.exports=router;