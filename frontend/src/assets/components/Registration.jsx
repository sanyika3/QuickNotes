import { useState } from "react";
import axios from "axios";
import "../styles//Registration.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Registration(){
    const [message,setMessage] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e) => {
          e.preventDefault();

          try{
            const response = await axios.post("http://127.0.0.1:8000/registration", 
            {email,username,password}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
           
          const data = response.data;

          if(data && response.status === 201){
                setMessage(response.data.message)
                console.log("Sikeres Regisztráció!")
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

          }

        }catch (error){
            setMessage(error.response.data.message);
          }
        
    }


    return (
        <div className="Registration-box">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} method="POST">
                <div className="input-group">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); }}
                        required
                    />
                </div>

                <div className="input-group">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                        required
                    />
                </div>

                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                        required
                    />
                </div>

                <button type="submit" className="registration-btn">Register</button>
            </form>
            {message && <p className="registration-message">{message}</p>}
        </div>
    );
}

export default Registration;