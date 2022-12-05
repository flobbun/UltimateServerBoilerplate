import {omit} from 'lodash';
import {PublicUser, User} from '../interfaces/user.interface';

export const getPublicUser = (user: User) =>
    omit(user.toObject(), ['private', 'acceptTerms', 'receiveEmails', '__v', 'createdAt', 'updatedAt']) as unknown as PublicUser;
