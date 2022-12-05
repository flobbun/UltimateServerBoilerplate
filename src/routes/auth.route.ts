/* eslint-disable no-invalid-this */
import {Request, Response} from 'express';
import {PermissionLevels} from '../constants/permissionLevels';
import {SignupBody} from '../interfaces/auth.interface';
import {AuthService} from '../services/auth.service';

class AuthRoute {
    public path = '/auth';
    public permissionLevel = PermissionLevels.PUBLIC;
    public routesMap = {
      post: {
        '/signup': this.signUp,
        '/login': this.logIn,
        '/check-email': this.checkEmail,
        '/refresh-token': this.refreshToken,
      },
      delete: {
        '/logout': this.logOut,
      },
    }

    async refreshToken(req: Request, res: Response) {
      const {token} = req.body;
      try {
        const data = await AuthService.refreshToken(token);
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async signUp(req: Request<{}, {}, SignupBody>, res: Response) {
      try {
        const data = await AuthService.signUp(req.body);
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async logIn(req: Request, res: Response) {
      try {
        const data = await AuthService.logIn(req.body);
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async logOut(req: Request, res: Response) {
      const {token} = req.body;
      try {
        const data = await AuthService.logOut(token);
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async checkEmail(req: Request, res: Response) {
      const {email} = req.body;
      try {
        const data = await AuthService.checkEmail(email);
        res.status(204).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }
}

export default AuthRoute;
