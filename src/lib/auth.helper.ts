import {sign} from 'jsonwebtoken';
import config from '../config';
import {User} from '../interfaces/user.interface';

const {JWT_TOKEN, JWT_EXPIRATION, JWT_REFRESH_TOKEN} = config;

export const generateToken = (user: Partial<User>) => sign({_id: user._id, email: user?.private?.email}, JWT_TOKEN, {expiresIn: JWT_EXPIRATION});
export const generateRefreshToken = (user: Partial<User>) => sign({_id: user._id, email: user?.private?.email}, JWT_REFRESH_TOKEN);

export const getUserCredentials = (user: Partial<User>) => {
  try {
    return {
      token: generateToken(user),
      refreshToken: generateRefreshToken(user),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error generating token');
  }
};
