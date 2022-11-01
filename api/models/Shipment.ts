import mongoose, { Schema } from 'mongoose';
import { transportPackUnitTypes } from './transportPacksTypes';

const ShipmentModel = new Schema({
    referenceId: { type: String, required: true },
    organizations: [ {type: Schema.Types.ObjectId, ref: 'Organization'} ],
    transportPacks: [ {
        weight: { type: String },
        unit: {
            type: String,
            enum: {
                values: Object.values(transportPackUnitTypes)
            }
        }
    } ],
    estimatedTimeArrival: { type: Date, default: undefined }, 
});

export default mongoose.model('Shipment', ShipmentModel);