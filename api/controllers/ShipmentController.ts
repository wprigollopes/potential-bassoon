import Organization from '../models/Organization';
import { Request, Response } from 'express';

import Shipment from '../models/Shipment';
import { transportPackUnitTypes, convert } from '../models/transportPacksTypes';

const ShipmentController = {
    async find (req: Request, res: Response): Promise<Response> {
        const { referenceId } = req.params;
        const data = await Shipment.findOne(
            { referenceId },
        ).
        populate('organizations').
        exec();
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json('Shipment not found');
        }
    },

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { referenceId, organizations, transportPacks } = req.body;
            const organizationRefs = await Promise.all(organizations.map(async (code: String) => {
                const orgData = await Organization.findOne({ code }).exec();
                if (!orgData) {
                    throw new Error(`Organization ${code} not found`);
                }
                return orgData?._id;
            }));

            const data = {
                referenceId,
                organizations: organizationRefs,
                transportPacks: transportPacks.nodes.map((val: any) => val.totalWeight) ?? [],
                estimatedTimeArrival: req.body.estimatedTimeArrival ?? undefined
            };
            const errors = new Shipment(data).validateSync()
            if (errors) {
                return res.status(400).json({ message: errors.message });
            }
            return await Shipment.updateOne(
                { referenceId },
                data,
                { upsert: true }
            ).then(
                () => res.status(201).json({ message: 'Shipment created/updated successfuly' })
            ).catch(
                (err) => res.status(404).json(err)
            );
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async sumAll(req: Request, res: Response): Promise<Response> {
        try {
            const unit = req.params?.unit.toUpperCase();

            const validateUnitTypes = Object.values(transportPackUnitTypes).some(el => el == unit);
            if (!validateUnitTypes) {
                throw new Error(`Type ${unit} is invalid`);
            }
            const shipmentList = await Shipment.
                find().
                select('transportPacks.weight transportPacks.unit').
                exec();

            const weightsAndUnits = shipmentList.reduce((tp: Array<Object>, { transportPacks }) => {
                return tp.concat(transportPacks);
            }, []);
            const total = weightsAndUnits.reduce((acc: number, tp: Array<any>): number => {
                return acc+convert(tp.unit, unit, parseFloat(tp.weight));
            }, 0);
            return res.status(200).json({ message: `The total weight in ${unit} is ${total.toFixed(5)}`});
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export default ShipmentController;