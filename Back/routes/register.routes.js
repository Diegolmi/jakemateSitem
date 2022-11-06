import { Router } from "express";
import { register } from "../controllers/authController.js";
const router = Router();

// router.get('/register', register)
router.get('/register:id')
router.post('/register', register)
router.put('/register/:id')
router.delete('/register/:id')

export default router;