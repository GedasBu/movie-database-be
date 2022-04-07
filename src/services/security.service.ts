import { UserModel } from '../models/user';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUserEmail: string;
    }
  }
}

const createUser = async (user: User): Promise<User> => {
  user.password = sha256(user.password);
  const savedUser = await new UserModel(user).save();

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    password: '',
  };
};

const getSecret = (): string => {
  const secret = process.env.APP_SECRET;
  if (!secret) {
    console.error('Secret not defined');
    throw new Error('error');
  }
  return secret;
};

const checkLogin = async (user: UserLogin): Promise<AccessToken> => {
  const userPassword = sha256(user.password);
  const tokenLifetime = parseInt(process.env.APP_LIFETIME || '86400000');
  const existingUser = await UserModel.findOne({ email: user.email }).exec();

  if (!existingUser) throw new Error('Invalid creadentials');

  if (existingUser.password === userPassword) {
    const token = jwt.sign(
      {
        id: existingUser.email,
      },
      getSecret(),
      {
        expiresIn: tokenLifetime,
      },
    );
    return {
      token: token,
    };
  } else {
    throw new Error('Invalid creadentials');
  }
};

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authValues = req.headers.authorization?.split(' ');
  if (authValues && authValues[0] === 'Bearer') {
    jwt.verify(authValues[1], getSecret(), function (err, authData) {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.currentUserEmail = authData?.email || '';
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { createUser, checkLogin, authenticate };
