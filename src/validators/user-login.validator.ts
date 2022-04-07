import { body } from 'express-validator';
import { UserModel } from '../models/user';

const regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)' + '(?=.*[-+_!@#$%^&*., ?]).+$';

const loginRules = [
  body('email')
    .isEmail()
    .custom(
      (email) =>
        new Promise((resolve, reject) => {
          UserModel.exists({ email })
            .then((value) => {
              if (!value) {
                reject(new Error('Email doesn' + "'" + 't exist'));
              } else {
                resolve(true);
              }
            })
            .catch((err) => reject(err));
        }),
    ),
  body('password').isLength({ min: 8 }).matches(regex),
];

export default loginRules;
