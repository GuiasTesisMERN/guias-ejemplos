// ./src/services/user.services.js
const { UserModel } = require('../models/User');
const UserRepository = require('../models/repository/UserRepository');
const { BadRequestError } = require('../utils/app-errors');
const { generateAccessToken } = require('../utils/Auth');
const mongoose_objectid = require('mongoose/lib/types/objectid');

const _repository = new UserRepository();

/**
     * @description Busca en el usuario por email y contraseña, luego retorna los datos y el token de acceso
     * @param {email: string, password: string} userData 
     * @throws {BadRequestError}
     * @returns {email: string, password: string} 
     */
const FindUserByEmailAndPassword = async (userData) => {
    const { email, password } = userData;

    const existeEmail = await UserModel.findOne({
        email: email
    })

    if(!existeEmail) {
        throw new BadRequestError('Email no existe en los registros.');
    }

    const userLoginData = await _repository.FindUserByEmailAndPassword(email, password);
    console.log(userLoginData);
    if(!userLoginData) {
        throw new BadRequestError('Email y/o clave incorrecta');
    }
    
    return {
        mensaje: `Usuario ${userLoginData.nombres} ${userLoginData.apellidos} se ha logeado`,
        token: generateAccessToken(email)
    };
}

const CreateNewUser = async (userData) => {
        
    let {nombres, apellidos, email, password} = userData;
    
    const newUser = await _repository.CreateUser(
        nombres, apellidos,
        email, password
    );

    return newUser;
}

module.exports = {
    FindUserByEmailAndPassword,
    CreateNewUser
}
