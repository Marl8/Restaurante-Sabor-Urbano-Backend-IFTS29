import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    seq: { type: Number, default: 0 }     
});

const Counter = mongoose.model('Counter', counterSchema);


export const getNextSequence = async (name) => {
    const ret = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true } 
    );
    return ret.seq;
};

export default Counter;