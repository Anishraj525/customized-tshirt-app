import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginScreen.css";

function RegisterScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === email
    );

    if (userExists) {
      alert("User already exists");
      return;
    }

    const newUser = { email, password };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        <form onSubmit={registerHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterScreen;
