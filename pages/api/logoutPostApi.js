import { destroyUserSession } from "../../lib/session";

export default async function logoutPostApi(req, res) {
  //Destroying session for the logout user
  destroyUserSession(res);
  res.send("logout successfully");
}
