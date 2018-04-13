import { Document } from 'mongoose';

export interface BagModel extends Document {
    readonly code: string;
    readonly desription: string;
}
