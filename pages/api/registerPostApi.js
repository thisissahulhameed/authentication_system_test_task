import dbQueryHandler from "../../database/db";
import bcrypt from "bcrypt";
import { validateEmail, validatePass } from "../../utils/util";

export default async function registerPostApi(req, res) {
  try {
    const { username, email, password } = req.body;

     //Validation of mail
    if (!validateEmail(email)) {
      res.status(404).json({ errMessage: "Invalid Email" });
    }

     //Validation of password
    if (!validatePass(password)) {
      res
        .status(404)
        .json({
          errMessage:
            "Password must contains capital letters numbers and special characters",
        });
    }

    //Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Inserting the users credentials
    const SQLquery =
      `INSERT INTO ${process.env.DB_TABLE} (username, email, password) VALUES (?, ?, ?)`;
    const values = [username, email, hashedPassword];

    const data = await dbQueryHandler(SQLquery, values);

    //Email must be unique 
    if (data.sqlState == "23000" && data.sqlMessage.includes("email")) {
      throw new Error("Email has been taken");
    }

    res.status(201).json(data);
  } catch (err) {
    if (err.message) {
      res.status(404).json({ errMessage: err.message });
    } else {
      res.status(500).json({ errMessage: "Error in regsiter query" });
    }
  }
}
