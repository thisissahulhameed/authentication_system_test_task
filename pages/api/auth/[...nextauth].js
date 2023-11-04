import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//Google OAuth credentials
export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
    }),
  ],
});
