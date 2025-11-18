import UserService from '../services/UserService.js';

// Save User API

const saveUserAPI = async(req, res)=>{
    try {
        const user = await UserService.saveUser(req.body);
        res.status(201).json({ message: 'Cliente guardado con éxito', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Listar todos los users API 

const findUsersAPI = async (req, res)=>{
    try {
        const users = await UserService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Buscar user por id para API 

const findUserByIdAPI = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await UserService.findUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Buscar user por DNI para API 

const findUserByDniAPI = async (req, res) => {
    try{
        const {dni} = req.query;
        const user = await UserService.findUserByDni(dni);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Actualiza user API

const updateUserAPI = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserService.updateUser(id, req.body);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(200).json({ usuario: result.updatedUser, message: result.message });
    } catch (error) {
        res.status(400).json({message: error.message});
    }    
};


// Delete user API

const deleteUserAPI = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserService.deleteUser(id);
        if (!result){
            return res.status(400).json({error: 'Usuario no encontrado'});
        }
        res.status(200).json( {message: 'Borrado con éxito'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


// Login API

const loginAPI = async (req, res)=>{
    try {       
        const result = await UserService.loginUser(req.body);
        if(result.islogin) {
            res.status(200).json( {message: 'Login exitoso', token: result.token, role: result.role});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}; 

const UserAPIController = {
    saveUserAPI,
    findUsersAPI,
    findUserByIdAPI,
    findUserByDniAPI,
    updateUserAPI,
    deleteUserAPI,
    loginAPI,
};

export default UserAPIController;