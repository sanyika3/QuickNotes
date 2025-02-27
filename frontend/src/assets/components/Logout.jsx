import axios from "axios";
import useAuth from "./useAuth";

function Logout() {
  const isLoggedIn = useAuth();
  const handleLogout = async () => {
    try{
         await axios.post("http://127.0.0.1:8000/logoutUser",
        {},
        {
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],
            },
            withCredentials: true,
        });

        window.location.reload();

    } catch (error) {
         console.error("Sikertelen kijelentkezés:", error);
    }
  };
  return (
    isLoggedIn ? (

        <button onClick={handleLogout} className="btnLogout">
        Logout
        </button>
    ) : null

);
}
export default Logout;