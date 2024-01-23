import { Router } from "express";
import { protect,restrictTo } from "../controllers/auth.js";
import { getMe, updateMe, deleteMe, getAllUsers, getSingleUser, updateUser, deleteUser, createNewAdmin } from "../controllers/user.js";

const router = Router();


// Protect all the route after this point (only logged in user can access)
router.use(protect);

router.get('/me', getMe);

router.patch('/updateme', updateMe);

router.delete('/deleteme', deleteMe);

// Restrict to only admin after this point
router.use(restrictTo('admin'));

router
    .route('/')
    .get(getAllUsers)

router
    .route('/:id')
    .get(getSingleUser)
    .patch(updateUser)
    .delete(deleteUser);

router.route('/create-new-admin/:id').patch(createNewAdmin)

export default router;
