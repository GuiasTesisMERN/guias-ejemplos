// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login, signUp } = require('../controllers/user.controller');
const { validarLogin, validarSignUp } = require('../middlewares/user.middleware');

const UserRoute = Router();

/**
 * Higher order function para manejar las excepciones lanzadas en las 
 * demas funciones debe de ir en la rutas
 * @param function fn(req, res, next)
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

UserRoute.post('/login', asyncHandler(validarLogin), asyncHandler(login));

UserRoute.post(
    '/sign_up', 
    asyncHandler(validarSignUp), 
    asyncHandler(signUp)
);

module.exports = {
    UserRoute
}
