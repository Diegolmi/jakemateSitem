import { Router } from "express";
import { createRegister, getRegister, getRegisterById, updateRegister, deleteRegister, login  } from "../controllers/authController.js";
const router = Router();

// router.get('/register', register)
router.get('/register/:id', getRegisterById)
router.get('/register', getRegister)
router.post('/register', createRegister)
router.put('/register/:id', updateRegister )
router.delete('/register/:id', deleteRegister)
router.post('/login', login)


export default router;