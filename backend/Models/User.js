import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the Name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    }
});

export const User = mongoose.model('User', UserSchema);