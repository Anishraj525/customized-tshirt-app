import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ email })
    )

    navigate("/home")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default LoginScreen
