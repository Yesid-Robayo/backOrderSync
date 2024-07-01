import { Router } from "express";
import { addUser, deleteUser, getCitys, getUserById, getUsers, getUsersByOffset, updateUser } from "../controllers/userController";

const router = Router();

router.get('/users', getUsersByOffset);
router.get('/usersAll', getUsers);
router.post('/users', addUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/usersCitys', getCitys);

export default router;