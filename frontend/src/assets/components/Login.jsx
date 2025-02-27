import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa"; // Ikonok importálása

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/loginUser",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data && response.status === 202) {
        setMessage(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} method="post">
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
  );
}

export default Login;