import {Connection, model, Schema} from 'mongoose';

export const refreshTokenSchema = new Schema(
    {
      token: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    }
);

const RefreshTokenModel = model('refreshTokens', refreshTokenSchema);

export const createRefreshTokenModel = (connection: Connection) => connection.model('refreshTokens', refreshTokenSchema);

export {RefreshTokenModel};
