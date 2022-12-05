/* eslint-disable no-invalid-this */
import {Request, Response} from 'express';
import {PermissionLevels} from '../constants/permissionLevels';
import {AddProjectBody} from '../interfaces/project.interface';
import { User } from '../interfaces/user.interface';
import {ProjectService} from '../services/project.service';

class ProjectsRoute {
    public path = '/projects';
    public permissionLevel = PermissionLevels.USER;
    public routesMap = {
      get: {
        '/': this.getProjects,
        '/:projectId': this.getProject,
      },
      post: {
        '/': this.createProject,
      },
      put: {
        '/:projectId': this.updateProject,
      },
      delete: {
        '/:projectId': this.removeProject,
      },
    }

    async getProjects(req: Request, res: Response) {
      try {
        const data = await ProjectService.getProjects();
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async getProject(req: Request<{ projectId: string }>, res: Response) {
      try {
        const data = await ProjectService.getProject(req.params.projectId);
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async createProject(req: Request<{}, {}, { project: AddProjectBody; user: User }>, res: Response) {
      try {
        const {project, user} = req.body;
        await ProjectService.createProject(project, user._id);
        res.status(201).json({message: 'Project created'});
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async updateProject(req: Request<{ projectId: string }, {}, AddProjectBody>, res: Response) {
      try {
        const data = await ProjectService.updateProject(req.params.projectId, req.body);
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json({error});
      }
    }

    async removeProject(req: Request<{ projectId: string }>, res: Response) {
      try {
        await ProjectService.deleteProject(req.params.projectId);
        res.status(201).json({message: 'Project deleted'});
      } catch (error) {
        res.status(400).json({error});
      }
    }
}

export default ProjectsRoute;
