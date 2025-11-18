import mongoose from "mongoose";

const deliveryOrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    items: [{
        menuItem: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "MenuItem", 
            required: true },
        quantity: { 
                type: Number, 
                required: true },
        price: { 
            type: Number, 
            required: true }        
        }],
    status: {
        type: String,
        enum: ["preparing", "pending", "dispatched", "delivered"], 
        default: 'preparing',
        required: true
    },
    total: {type: Number, required: true},
    assignedRiderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
    },
    estimatedTime: {type: Date, required: false },
    plataforma: {type: String, default: 'Propia'},
}, { timestamps: true });

const DeliveryOrder = mongoose.model('DeliveryOrder', deliveryOrderSchema);

export default DeliveryOrder;


