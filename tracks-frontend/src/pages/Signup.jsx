import { useState } from "react";
import { apiPost } from "../api/client";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await apiPost("/auth/signup", { email, password });

      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  }

  return (
    <div className="card">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;