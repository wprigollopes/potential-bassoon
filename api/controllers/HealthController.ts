import { Request, Response } from 'express';

const HealthController = {

    async index(req: Request, res: Response): Promise<Response> {
        return res.json({ message: "Healthy!" });
    }

};

export default HealthController;