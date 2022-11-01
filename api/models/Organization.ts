import mongoose, { Schema } from 'mongoose';

const OrganizationModel = new Schema({
    id: { type: String, required: true },
    code: { type: String, required: true }
});

export default mongoose.model('Organization', OrganizationModel);