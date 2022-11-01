import { Request, Response } from 'express';

import Organization from '../models/Organization';

const OrganizationController = {
    async find(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await Organization.findOne(
            { id },
            { id: 1, code: 1}
        ).
        exec(function(err, Organization) {
            if (err) {
                return res.status(404).json({ message: err });
            }
            return res.json(Organization);

        });
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { id } = req.body; 
        const data = {
            id,
            code: req.body.code
        };
        await Organization.updateOne(
            { id },
            data,
            { upsert: true}
        );
        return res.status(201).json({ message: 'Organization created/updated successfuly' });
    }
};

export default OrganizationController;