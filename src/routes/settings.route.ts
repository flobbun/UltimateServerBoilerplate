import {Request, Response} from 'express';

class SettingsRoute {
  async dummyEndpoint(req: Request, res: Response) {
    // const data = await DummyService.method(req.body);
    res.status(201).json({});
  }
}

export default SettingsRoute;
