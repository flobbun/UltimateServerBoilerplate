/* eslint-disable no-invalid-this */
import {Request, Response} from 'express';
import {PermissionLevels} from '../constants/permissionLevels';

class IndexRoute {
    public path = '/health';
    public permissionLevel = PermissionLevels.PUBLIC;
    public routesMap = {
      get: {
        '/': this.getHealth,
      },
    }

    async getHealth(req: Request, res: Response) {
      res.status(200).json({message: 'OK'});
    }
}

export default IndexRoute;
