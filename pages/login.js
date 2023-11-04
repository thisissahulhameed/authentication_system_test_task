import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { data: session } = useSession();

  const router = useRouter();

  //Already session available
  if (session) {
    router.push("/profile");
  }

  //Handling  the login request with given user credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("api/loginPostApi", {
        email,
        password,
      });
      router.push("/profile");
    } catch (err) {
      setErrors(err.response.data.errMessage);
    }
  };

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="error">{errors}</p>
      </form>
      <Link href="/register">
        <small>don't have an account? register</small>
      </Link>
      <button
        className="google-button"
        onClick={() => {
          signIn("google");
        }}
      >
        <img
          src="https://pngimg.com/d/google_PNG19635.png"
          alt="Google Icon"
          class="google-icon"
        ></img>
        <span>Login with Google</span>
      </button>
    </main>
  );
}
