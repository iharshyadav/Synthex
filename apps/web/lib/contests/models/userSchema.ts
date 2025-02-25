import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isPro: { type: Boolean, default: false },
    proSince: { type: Number },
    paymentId: { type: String }
}, {
    timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);