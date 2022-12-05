import {Document} from 'mongoose';

export interface Private {
    email: string;
    password: string;
}

export type PublicUser = Omit<User, 'private' | 'acceptTerms' | 'receiveEmails'>;

export interface UserFields {
    firstName: string;
    lastName: string;
    birthDay: Date;
    profession: string;
    area: string;
    profilePicture: string;
    receiveEmails: boolean;
    acceptTerms: boolean;
    private: Private;
}

export interface User extends UserFields, Document {}
