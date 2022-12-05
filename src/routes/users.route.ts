/* eslint-disable no-invalid-this */
import {Request, Response} from 'express';
import {PermissionLevels} from '../constants/permissionLevels';
import {PublicUser} from '../interfaces/user.interface';
import {UserService} from '../services/user.service';

class UsersRoute {
    public path = '/users';
    public permissionLevel = PermissionLevels.USER;
    public routesMap = {
      get: {
        '/': this.getUsers,
        '/:userId': this.getUser,
      },
      put: {
        '/:userId': this.updateUserProfile,
      },
    }

    async getUsers(req: Request, res: Response) {
      try {
        const data = await UserService.getUsers();
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async getUser(req: Request<{ userId: string }>, res: Response) {
      try {
        const data = await UserService.getUser(req.params.userId);
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async updateUserProfile(req: Request<{ userId: string }, {}, PublicUser>, res: Response) {
      try {
        const data = await UserService.updateUser(req.params.userId, req.body);
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }
}

export default UsersRoute;
