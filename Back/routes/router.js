// const express = require("express");
// const router = express.Router();
import { Router } from 'express';
// const { register } = require("../controllers/authController");
import { pool } from '../databases/db.js'

const router = Router();

router.get('/ping', async (req, res) => {
   const [rows] = await pool.execute('SELECT 1 + 1 as result')
   console.log(rows[0])
    res.json(rows[0])
})

// router.get("/", (req, res) => {


//     res.render("index")
// });

// router.get("/register", (req, res) => {
//     res.render("register");
// });

// router.get("/login", (req, res) => {
//     res.render("login");
// });


// router.post("/register", register)

// module.exports = router;

export default router;