// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const { promisify } = require('util')
// const conexion = require('../databases/db')
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs/dist/bcrypt";
// import { promisify } from "util";
// import conexion from "../databases/db.js";

import { pool } from "../databases/db.js";


export const register = async(req, res) => {

    console.log(pool)
 
    const { username, email, password } = req.body;
    const [result] = await pool.query( "INSERT INTO register(username, email, password) VALUES (? , ? , ?)" , [username, email, password]);
     
    res.json({
        id: result.insertId,
        username,
        email,
        password
    })
    console.log(result)

}





// exports.register = async (req, res) => {
//     console.log(req.body)

//     const email = req.body.email
//     const password = req.body.password

//     console.log(email, password)

// }
