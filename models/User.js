import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    rol: { 
        type: String, required: true,
        enum: ['Employee', 'Admin'],
    },
});
    
const User = mongoose.model('User', userSchema);

export default User;