import { getUserSession } from "../lib/session";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile({ jwtSession }) {
  const { data: session } = useSession();
  const router = useRouter();

  //Logout for JWT session manangement
  const handleLogout = async () => {
    try {
      await axios.post("api/logoutPostApi");
      router.push("/login");
    } catch (err) {
      console.log(err, "log out error");
    }
  };

  //Either OAuth Google session or JWT Session
  const currentSession = session || jwtSession;

  if (currentSession) {
    //OAuth Google session
    if (currentSession === session) {
      return (
        <main>
          <div className="container">
            <h1>Hello, {session.user.email}</h1>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              signOut("google");
            }}
          >
            Logout
          </button>
        </main>
      );
    }

    //JWT session
    if (currentSession === jwtSession) {
      return (
        <main>
          <div className="container">
            <h1>Hello, {jwtSession}</h1>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            logout
          </button>
        </main>
      );
    }
  } else {
    return (
      <main>
        <h1>user not logged in</h1>
        <Link href="/login">login again</Link>
      </main>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  const jwtSession = getUserSession(req);
  return { props: { jwtSession } };
}
