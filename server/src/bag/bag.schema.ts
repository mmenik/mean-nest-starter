import * as mongoose from 'mongoose';

export const BagSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: String
},
    { collection: 'bag' });
