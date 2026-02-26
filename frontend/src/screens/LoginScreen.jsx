import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!validUser) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(validUser));
    navigate("/home");
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "80px auto",
        padding: "30px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "30px",
            borderRadius: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        New user?{" "}
        <Link
          to="/register"
          style={{ color: "cyan", textDecoration: "none" }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginScreen;