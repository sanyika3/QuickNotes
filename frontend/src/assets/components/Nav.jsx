import "../styles/Nav.css";
import { useState } from "react";
import CustomModal from "./Modal";
import Login from "./Login";
import Logout from "./Logout";
import Registration from "./Registration";
import useAuth from "./useAuth";

function Nav() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const isLoggedIn = useAuth();

  return (
    <div className="navContainer">
      <div className="notesTitle">
        <span role="img" aria-label="note">📝</span>
        QuickNotes
      </div>
      <div className="navLinks">
        {!isLoggedIn ? (
          <>
            <button
              className="btnOpenLogin"
              onClick={() => setIsLoginOpen(true)}
              type="button"
            >
              Login
            </button>
            <CustomModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              constructor={<Login />}
            />
            <button
              className="openRegistration"
              onClick={() => setIsRegistrationOpen(true)}
            >
              Registration
            </button>
            <CustomModal
              isOpen={isRegistrationOpen}
              onClose={() => setIsRegistrationOpen(false)}
              constructor={<Registration />}
            />
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  );
}

export default Nav;