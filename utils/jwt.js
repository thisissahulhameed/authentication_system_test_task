import jwt from "jsonwebtoken";

const jwtSecretKey = "this is secret";

export const generateJwt = (userCred) => {
  return jwt.sign(userCred, jwtSecretKey);
};

export const verifyJwt = (jwtToken) => {
  try {
    return jwt.verify(jwtToken, jwtSecretKey);
  } catch (err) {
    return null;
  }
};
