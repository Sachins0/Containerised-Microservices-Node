const { StatusCodes } = require("http-status-codes");
const {UserRepository, RoleRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {Auth, ENUMS}= require('../utils/common');

const userRepo= new UserRepository();
const RoleRepo= new RoleRepository();

async function create(data){
    try {
        const user= await userRepo.create(data);
        const role= await RoleRepo.getRoleByName(ENUMS.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>explanation.push(err.message));
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new User object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user= await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }
        const passwordMatch= Auth.checkPassword(data.password, user.password);
        if(!passwordMatch){
            throw new AppError('Invalid password',StatusCodes.BAD_REQUEST);
        }
        const jwt= Auth.createToken({id: user.id, email: user.email});
        return jwt;
    } catch (error) {
        throw error;
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing jwt token',StatusCodes.BAD_REQUEST);
        }
        const response= Auth.verifyToken(token);
        const user= await userRepo.get(response.id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.BAD_REQUEST);
        }
        return user.id;
    } catch (error) {
        throw error;
    }
}

async function addRoleToUser(data){
    try {
        const user= await userRepo.get(data.id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.NOT_FOUND);
        }
        const role= await RoleRepo.getRoleByName(data.role);
        if(!role){
            throw new AppError('No user found for given role',StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch (error) {
        throw error;
    }
}

async function isAdmin(id){
    try {
        const user= await userRepo.get(id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.NOT_FOUND);
        }
        const adminRole= await RoleRepo.getRoleByName(ENUMS.USER_ROLES_ENUMS.ADMIN);
        if(!adminRole){
            throw new AppError('No user found for given role',StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminRole);
    } catch (error) {
        throw error;
    }
}

module.exports= {
    create,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}