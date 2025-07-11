import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";


const UseAuth = () => {

    const auth = useContext(AuthContext);
    return auth;

};

export default UseAuth;

// Context API ব্যবহার করছো এবং AuthContext নামে একটা Context Object আছে যেটা দিয়ে Authentication 
// সংক্রান্ত ডেটা (যেমন: user login status, user info, token ইত্যাদি) রাখা হয়।