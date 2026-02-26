import { useNavigate } from "react-router-dom"
import logo from "./assets/log.png"

function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const logoutHandler = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div
      style={{
        padding: "20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to right, #3b0a4f, #2e3a8c)"
      }}
    >
      {/* Bigger Centered Logo */}
      <img
       src={logo}
        alt="Customised T-Shirt"
       style={{
       maxWidth: "300px",
       width: "100%",
       height: "auto",
       cursor: "pointer"
      }}
  onClick={() => navigate("/home")}
/>
      {user && (
        <div style={{ marginTop: "15px" }}>
          <button onClick={() => navigate("/cart")}>
            Cart
          </button>

          <button
            onClick={logoutHandler}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Header