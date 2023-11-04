import cookie from "cookie";
import { generateJwt, verifyJwt } from "../utils/jwt";

//Create a user session using JWT
export const createUserSession = (res, sessionData) => {
  const jwtToken = generateJwt(sessionData);
  const cookieValue = cookie.serialize("session", jwtToken, {
    maxAge: 604800,
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookieValue);
};

//Retrive user session
export const getUserSession = (req) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const jwtToken = cookies.session;
  const verifiedJwt = verifyJwt(jwtToken);
  if (verifiedJwt) {
    return verifiedJwt;
  } else {
    return null;
  }
};

//Destroy user session 
export const destroyUserSession = (res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", "", {
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
};


