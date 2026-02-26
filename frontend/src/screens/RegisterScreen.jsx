import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === email
    );

    if (userExists) {
      alert("User already exists");
      return;
    }

    const newUser = { name, email, password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterScreen;