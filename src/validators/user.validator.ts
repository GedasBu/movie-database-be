import { body } from 'express-validator';
import { UserModel } from '../models/user';

const regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)' + '(?=.*[-+_!@#$%^&*., ?]).+$';

const signUpRules = [
  body('name').trim().not().isEmpty().isLength({ min: 3, max: 50 }),
  body('email')
    .isEmail()
    .custom(
      (email) =>
        new Promise((resolve, reject) => {
          UserModel.exists({ email })
            .then((value) => {
              if (value) {
                reject(new Error('Email exists'));
              } else {
                resolve(true);
              }
            })
            .catch((err) => reject(err));
        }),
    ),
  body('password').isLength({ min: 8 }).matches(regex),
];

export default signUpRules;
