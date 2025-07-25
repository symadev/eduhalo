import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const UseAuth = () => {

    const auth = useContext(AuthContext);
    return auth;

};

export default UseAuth;

