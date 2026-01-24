import { Router } from "express";

import { Signup ,login} from "../controllers/authController.js";

const router=Router()

router.route('/signup').post(Signup)
router.route('/login').post(login)

export default router;