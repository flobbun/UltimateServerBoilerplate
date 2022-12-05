// import User from 'types';

export interface SignupBody {
  personalData: PersonalData;
  profession: string;
  area: string;
  profilePicture: string;
}

export interface PersonalData extends Record<string, string | boolean> {
  firstName: string;
  lastName: string;
  email: string;
  birthDay: string;
  password: string;
  receiveEmails: boolean;
  acceptTerms: boolean;
}

export interface SignupResponse {
  token: string;
  user: any;
}

export interface LogInBody {
  email: string;
  password: string;
}
