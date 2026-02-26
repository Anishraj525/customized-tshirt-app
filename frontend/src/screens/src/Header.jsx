import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const logoutHandler = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div style={{
      padding: "15px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      >
        T-Shirt Store
      </h2>

      {user && (
        <div>
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
