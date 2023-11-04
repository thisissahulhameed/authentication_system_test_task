import bcrypt from "bcrypt";
import dbQueryHandler from "../../database/db";
import { validateEmail } from "../../utils/util";
import { createUserSession } from "../../lib/session";

export default async function loginPostApi(req, res) {
  try {
    const { email, password } = req.body;

    //Validation of email
    if (!validateEmail(email)) {
      res.status(404).json({ errMessage: "Invalid Email" });
    }

    //Search for the particular email
    const SQLquery = `SELECT * FROM ${process.env.DB_TABLE} WHERE email='${email}'`;

    const data = await dbQueryHandler(SQLquery);

    const user = data[0];

    //Email not found (user is not available)
    if (!user) {
      throw new Error("Email not found");
    }

    //Matching the given password with stored password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Password does not match");
    } else {
      //Creating session for the authenticated user
      createUserSession(res, email);
    }

    res.status(201).json(data);
  } catch (err) {
    if (err.message) {
      res.status(404).json({ errMessage: err.message });
    } else {
      res.status(500).json({ errMessage: "Error in login query" });
    }
  }
}
