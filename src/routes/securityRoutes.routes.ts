import express from 'express';

import { signUp, login } from '../controllers/security.controller';
import { validate } from '../commons/index';
import signUpRules from '../validators/user.validator';
import loginRules from '../validators/user-login.validator';

const router = express.Router();

router.route('/sign-up').post(validate(signUpRules), signUp);
router.route('/login').post(validate(loginRules), login);

export default router;
