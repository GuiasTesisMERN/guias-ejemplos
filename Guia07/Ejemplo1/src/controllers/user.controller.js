// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, CreateNewUser } = require('../services/user.services');

const login = async (req, res) => {
    const usuarioReqData = req.body;

    const usuario = await FindUserByEmailAndPassword(usuarioReqData);
    
    res.status(200).json(
        {
            mensaje: "Usuario logeado",
            estado: true,
            ...usuario
        }
    );
}

const signUp = async (req, res) => {
    const usuarioReqData = req.body;
    const newUser = await CreateNewUser(usuarioReqData);

    res.status(201).json({
        mensaje: "Usuario creado",
        datos: newUser,
        estado: true,
    })
};

module.exports = {
    login,
    signUp, 
}