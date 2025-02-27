import { useState, useEffect } from "react";
import axios from "axios";

function useAuth(){
    const [isLoggedIn,setIsLoggedIn] = useState(false)
useEffect(() => {
    axios.get("http://127.0.0.1:8000/checkAuth", {withCredentials:true}).then((response) => {
        setIsLoggedIn(response.data.isAuthenticated);
    }).catch(() => setIsLoggedIn(false))
},[])
    return isLoggedIn;
}

export default useAuth;