import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState("");

  const matchConfPassword = (confPassword) => {
    if (password === confPassword) setErrors("");
  };

  const router = useRouter();

  //Handling the register
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confPassword !== password) {
      setErrors("Passwords must match");
    } else {
      try {
        await axios.post("api/registerPostApi", {
          username,
          email,
          password,
        });
        router.push("/login");
      } catch (err) {
        setErrors(err.response.data.errMessage);
      }
    }
  };

  return (
    <main>
      <h2 className="header">Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confPassword}
          onChange={(e) => {
            matchConfPassword(e.target.value);
            setConfPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Register</button>
        <p className="error">{errors}</p>
      </form>
      <Link href="/login">
        <small>already have an account? login</small>
      </Link>
    </main>
  );
}
