import { pool } from "../databases/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";

export const createRegister = async (req, res) => {
  try {
    let { email, password } = req.body;
    password = password.trim();

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, 10);
    const [result] = await pool.query("INSERT INTO register SET ? ", {
      email,
      password: hash,
    });

    console.log(result, "result created");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegister = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM register ORDER BY createAt DESC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRegisterById = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM register WHERE id = ?", [
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await pool.query(
      "UPDATE register SET  email = ?, password = ? WHERE id = ?",
      [email, password, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRegister = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM register WHERE idregister = ?",
      [req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    password = password.trim();

    const [result] = await pool.query(
      "SELECT * FROM register WHERE email = ?",
      [email]
    );
    if (result.length > 0) {
      console.log(result[0], "result login");
      console.log(password, "password");
      const validPassword = await bcryptjs.compare(password, result[0].password);
      console.log(validPassword, "validPassword");
      if (validPassword) {
        const id = result[0].id;
        const token = jwt.sign({ id: id }, token_secreto, {
          expiresIn: 60 * 60 * 24,
        });
        const cookiesOptions = {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookiesOptions);
        res.status(200).json({ auth: true, token: token });
      } else {
        res.json({ auth: false, message: "Invalid password" });
      }
    } else {
      res.json({ auth: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// try {
//   const { email, password } = req.body;
//   const [result] = await pool.query("SELECT * FROM register WHERE email = ?", [
//     email,
//   ]);
//   if (
//     result.length == 0 ||
//     !bcryptjs.compareSync(password, result[0].password)
//   ) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: result[0].id }, process.env.SECRET_KEY, {
//     expiresIn: 60 * 60 * 24,
//   });
//   res.cookie("token", token, {
//     httpOnly: true,
//   });
//   res.json({ message: "ok" });
// } catch (error) {
//   return res.status(500).json({ message: error.message });
// }

// };

// Path: Back\controllers\authController.js
