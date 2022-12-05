import {compare as verify, hash} from 'bcrypt';
import {verify as verifyToken} from 'jsonwebtoken';
import config from '../config';
import {Errors} from '../constants/errors';
import UserFacingError from '../errors/UserFacingError';
import {LogInBody, SignupBody} from '../interfaces/auth.interface';
import {PublicUser, User} from '../interfaces/user.interface';
import {generateToken, getUserCredentials} from '../lib/auth.helper';
import {getPublicUser} from '../lib/users.helper';
import {RefreshTokenModel} from '../models/refreshTokens';
import {UserModel} from '../models/user.model';

class AuthService {
  async checkEmail(email: string): Promise<{ emailExists: boolean }> {
    const user = await UserModel.findOne({'private.email': email});
    return {emailExists: !!user};
  }

  async signUp(data: SignupBody): Promise<{ user: PublicUser; token: string }> {
    const {personalData, profession, area, profilePicture} = data;
    const {email, password, birthDay, ...rest} = personalData;
    const userExists = await UserModel.findOne({'private.email': email});
    if (userExists) {
      throw new UserFacingError(Errors.USER_ALREADY_EXISTS);
    }
    const user: User = await UserModel.create({
      ...rest,
      birthDay: new Date(birthDay),
      profession,
      area,
      profilePicture,
      private: {
        email: email,
        password: await hash(password, 10),
      },
    });

    // TODO: Send email to user to verify email address
    const credentials = getUserCredentials(user); // < Delete this when email verification is implemented
    await RefreshTokenModel.create({token: credentials?.refreshToken, userId: user._id}); // < and this as well
    return {user: getPublicUser(user), token: generateToken(user)};
  }

  async logIn(data: LogInBody): Promise<{ user: PublicUser; token: string; refreshToken: string }> {
    const user = await UserModel.findOne({'private.email': data.email});
    if (!user) {
      throw new UserFacingError(Errors.USER_NOT_FOUND);
    }
    if (!await verify(data.password, user.private.password)) {
      throw new UserFacingError(Errors.INVALID_CREDENTIALS);
    }
    const credentials = getUserCredentials(user);
    await RefreshTokenModel.create({token: credentials?.refreshToken, userId: user._id});
    return {user: getPublicUser(user), ...credentials!};
  }

  async refreshToken(token: string): Promise<{ user: PublicUser; token: string }> {
    const refreshToken = await RefreshTokenModel.findOne({token});
    if (!refreshToken) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
    const user = await UserModel.findById(refreshToken.userId);
    if (!user) {
      throw new UserFacingError(Errors.USER_NOT_FOUND);
    }

    try {
      const decoded = verifyToken(token as string, config.JWT_REFRESH_TOKEN as string);
      return {user: getPublicUser(user), token: generateToken(decoded as User)};
    } catch (error) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
  }

  async logOut(token: string): Promise<void> {
    const refreshToken = await RefreshTokenModel.findOne({token});
    if (!refreshToken) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
    await RefreshTokenModel.deleteOne({token});
  }
}

const authService = new AuthService();
export {authService as AuthService};

