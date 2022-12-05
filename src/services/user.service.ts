import {PublicUser, User} from '../interfaces/user.interface';
import {getPublicUser} from '../lib/users.helper';
import {UserModel} from '../models/user.model';

class UserService {
  async getUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id);
    return getPublicUser(user as User);
  }

  async updateUser(id: string, user: PublicUser) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user);
    return updatedUser;
  }
}

const userService = new UserService();
export {userService as UserService};
