import { jest } from '@jest/globals';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import { userData, savedUser, users } from './ObjectUtils/UserUtils.js';

const { saveUser, findAllUsers, findUserById, findUserByDni, updateUser, deleteUser, loginUser, loginUserWEB } = UserService;

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    // Test OK Save User

    test('Test OK crear un usuario', async () => {
        const user = userData;

        jest.spyOn(User, 'findOne').mockResolvedValue(null);
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');
        const saved = savedUser;
        User.prototype.save = jest.fn().mockResolvedValue(saved);

        const result = await saveUser(user);

        expect(User.findOne).toHaveBeenCalledWith({ dni: '18334455' });
        expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
        expect(User.prototype.save).toHaveBeenCalled();
        expect(result).toEqual(saved);
    });

    // Test FAIL save User

    test('Test FAIL DNI ya existe', async () => {
        const user = userData;

        const hashSpy = jest.spyOn(bcrypt, 'hash');
        jest.spyOn(User, 'findOne').mockResolvedValue({ dni: '18334455', name: 'Usuario Existente' });

        await expect(saveUser(user)).rejects.toThrow('El usuario ya existe');
        expect(User.findOne).toHaveBeenCalledWith({ dni: '18334455' });
        expect(hashSpy).not.toHaveBeenCalled();
    });

    
    // Test OK findAllUsers
    
    test('Test OK findAllUsers', async () => {
        const usersList = users;
        jest.spyOn(User, 'find').mockResolvedValue(usersList);

        const res = await findAllUsers();

        expect(res.length).toBe(2);
    });

    // Test FAIL findallusers

    test('findAllUsers - sin usuarios', async () => {
        jest.spyOn(User, 'find').mockResolvedValue([]);

        await expect(findAllUsers()).rejects.toThrow('No hay usuarios registrados en el sistema');
    });

    
    // Test OK findUserById
    
    test('Test OK findUserById', async () => {
        jest.spyOn(User, 'findById').mockResolvedValue({ id: '1', name: 'Juan', dni: '12345678' });

        const res = await findUserById('1');

        expect(res).toMatchObject({ id: '1' });
    });

    // Test FAIL findUserById

    test('Test FAIL findUserById', async () => {
        jest.spyOn(User, 'findById').mockResolvedValue(null);

        await expect(findUserById('1')).rejects.toThrow('Usuario no encontrado');
    });

    
    // Test OK findUserByDni

    test('Test OK findUserByDni', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({ id: '1', dni: '12345678', name: 'Juan' });

        const res = await findUserByDni('12345678');

        expect(res).toMatchObject({ dni: '12345678' });
    });

    // Test Fail findUserByDni    

    test('Test FAIL findUserByDni', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await expect(findUserByDni('123')).rejects.toThrow('Usuario no encontrado');
    });

    
    // Test OK updateUser

    test('Test OK updateUser', async () => {
        jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({ id: '1' });

        const res = await updateUser('1', userData);

        expect(res.message).toBe('User modificado con éxito');
        });

        test('updateUser - datos incompletos', async () => {
        const res = await updateUser('1', { name: 'Juan' });

        expect(res.error).toMatch('Datos incompletos');
    });

    // Test FAIL updateUser        

    test('Test FAIL updateUser', async () => {
        jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(null);

        const res = await updateUser('1', userData);

        expect(res.error).toBe('Usuario no encontrado');
    });

    
    // Test OK deleteUser
    
    test('Test OK deleteUser', async () => {
        jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue({ id: '1' });

        const res = await deleteUser('1');

        expect(res).toBe(true);
    });

    // Test FAIL deleteUser

    test('Test FAIL deleteUser', async () => {
        jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue(null);

        const res = await deleteUser('1');

        expect(res).toBe(null);
    });

    // Test OK loginUser
    
    test('Test OK loginUser', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({ _id: '1', username: 'juan', password: 'hashed', rol: 'Admin' });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue('token123');

        const res = await loginUser({ username: 'juan', password: '123' });

        expect(res.islogin).toBe(true);
        expect(res.token).toBe('token123');
        expect(res.role).toBe('Admin');
    });

    // Test FAIL loginUser 
        
    test('Test FAIL loginUser - usuario no encontrado', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await expect(loginUser({ username: 'juan', password: '123' })).rejects.toThrow('Usuario no encontrado');
    });

    // Test FAIL loginUser

    test('TEST FAIL loginUser - contraseña incorrecta', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({ username: 'juan', password: 'hashed' });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

        await expect(loginUser({ username: 'juan', password: '123' })).rejects.toThrow('Contraseña incorrecta');
    });

    
    // Test OK loginUserWEB
    
    test('loginUserWEB - éxito', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({
            username: 'juan',
            password: 'hashed',
            rol: 'Admin',
            toObject: () => ({ id: '1', username: 'juan', rol: 'Admin', password: 'hashed' })
        });

        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        const res = await loginUserWEB({ username: 'juan', password: '123' });

        expect(res.islogin).toBe(true);
        expect(res.user.password).toBeUndefined();
    });
});