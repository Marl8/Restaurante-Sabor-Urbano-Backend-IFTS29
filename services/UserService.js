import bcrypt from 'bcrypt'; 
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const saveUser = async({name, dni, email, username, password, rol})=>{
    try {
        if(!name || !dni || !email || !username || !password || !rol){
            throw new Error('Datos incompletos. Se requieren: name, dni, email, username, password, rol');
        }
        const found = await User.findOne({'dni': dni});
        if(found){
            throw new Error('El usuario ya existe');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            name: name,
            dni: dni,
            email: email,
            username: username,
            password: hashedPassword,
            rol: rol,
        });
        const savedUser = await user.save();
        if(savedUser){
            const userDto = createUserDto(savedUser);
            return userDto;
        }else{
            throw new Error('Ocurrió un error en el guardado');
        }        
    } catch (error) {
        throw new Error(error.message);
    }
};

const findAllUsers = async()=>{
    try {
        const users = await User.find();
        if(users.length === 0) {
            throw new Error('No hay usuarios registrados en el sistema');
        }
        const listUsers = users.map(us => {
            const userDto = createUserDto(us);
            return userDto;
        })
        return listUsers;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserById = async(id)=>{
    try {
        const user = await User.findById(id);
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        const userDto = createUserDto(user);
        return userDto;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserByDni = async(dni)=>{
    try {
        const user = await User.findOne({'dni': dni});
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        const userDto = createUserDto(user);
        return userDto;
    } catch (error) {
        throw new Error(error.message);
    }
};


const updateUser = async(id, {name, dni, email, username, password, rol})=>{
    try {
        if(!name || !dni || !email || !username || !password || !rol){
            return {error: 'Datos incompletos. Se requieren: name, dni, email, username, password, rol'};
        }
        const updatedUser = await User.findByIdAndUpdate(id, {name, dni, email, username, password, rol}, 
            {
                new: true,
            runValidators: true,
            }
        );
        if(!updatedUser){
            return {error: 'Usuario no encontrado'};
        }
        return {message: 'User modificado con éxito'};
    } catch (error) {
        throw new Error(error.message);
    }
};


const deleteUser = async(id)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser){
            return null;
        } 
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async ({username, password}) => {
    try {
        if (!username || !password) {
        throw new Error('Faltan datos: username y password son obligatorios');
        }
        const user = await User.findOne({ username });
        if (!user) {
        throw new Error('Usuario no encontrado');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        throw new Error('Contraseña incorrecta');
        }
        const token = jwt.sign({ 
            id: user._id,
            role: user.rol 
            }, 
            process.env.JWT_SECRET, 
            {expiresIn: "1h"});

        return {islogin: true, token: token, role: user.rol};
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUserWEB = async ({username, password}) => {
    try {
        if (!username || !password) {
        throw new Error('Faltan datos: username y password son obligatorios');
        }
        const user = await User.findOne({ username });
        if (!user) {
        throw new Error('Usuario no encontrado');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        throw new Error('Contraseña incorrecta');
        }
        const userDto = user.toObject();
        delete userDto.password;
        return {islogin: true, user:userDto};
    } catch (error) {
        throw new Error(error.message);
    }
};

function createUserDto(user){
    const userDto = {
        id: user.id,
        name: user.name,
        dni: user.dni,
        email: user.email,
        username: user.username,
        rol: user.rol,
    };
    return userDto;
}

const UserService = {
    saveUser,
    findAllUsers,
    findUserById,
    findUserByDni,
    updateUser,
    deleteUser,
    loginUser,
    loginUserWEB
};

export default UserService;