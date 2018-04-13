import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
    admin: { type: Boolean, default: false }
},
    { collection: 'user' });
