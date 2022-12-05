import {Connection, model, Schema} from 'mongoose';

export const PrivateSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      birthDay: {
        type: Date,
        required: true,
      },
      receiveEmails: {
        type: Boolean,
        required: true,
      },
      acceptTerms: {
        type: Boolean,
        required: true,
      },
      profession: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
        required: true,
      },
      skills: {
        type: Array,
        required: true,
      },
      private: {
        type: PrivateSchema,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
);

const UserModel = model('users', UserSchema);

export const createUserModel = (connection: Connection) => connection.model('users', UserSchema);

export {UserModel};
