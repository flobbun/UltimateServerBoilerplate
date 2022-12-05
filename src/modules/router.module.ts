import {Application} from 'express';
import {LogTypesEnum} from '../constants/logTypes.enum';
import {PermissionLevels} from '../constants/permissionLevels';
import {userAuth} from '../middlewares/userAuth.middleware';
import AuthRoute from '../routes/auth.route';
import IndexRoute from '../routes/index.route';
import UsersRoute from '../routes/users.route';
import {LogsService} from '../services/logs.service';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
class RouterModule {
    private app: Application;

    constructor(app: Application) {
      this.app = app;
      this.routing();
    }

    private ROUTES = [
      IndexRoute,
      AuthRoute,
      UsersRoute,
    ];

    routing() {
      this.ROUTES.forEach((Route) => {
        const route = new Route();
        const {path: mainRoute, routesMap, permissionLevel} = route || {};
        if (!mainRoute || !routesMap || !permissionLevel) {
          LogsService.log(`Invalid route => ${mainRoute}`, LogTypesEnum.ERROR);
          return;
        }
        // Middlewares
        if (route.permissionLevel === PermissionLevels.USER) {
          this.app.use(route.path, userAuth);
        }
        // Routes
        Object.entries(routesMap).forEach(([method, handlers]) => {
          Object.entries(handlers).forEach(([path, handler]) => {
            LogsService.log(`[Route SETUP]: ${method.toUpperCase()} ${mainRoute}${path}`, LogTypesEnum.DEBUG);
            this.app[method as Method](mainRoute+path, handler as () => void);
          });
        });
      });
    }
}

export default RouterModule;
