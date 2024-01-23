import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
import {upload} from '../middleware/multer.js';

const router = Router();

router.post('/login', loginUser)
router.post('/register', upload.fields([
    {
        name: "profileImg",
        maxCount: 1
    }, 
]), registerUser)

export default router;