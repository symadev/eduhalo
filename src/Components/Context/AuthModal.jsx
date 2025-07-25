import { useState } from "react";


import SignUp from "../Components.jsx/SignUp";
import Login from "../Components.jsx/Login";

const AuthModal = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    // Open login modal and ensure register modal is closed
    const openLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    // Open register modal and ensure login modal is closed
    const openRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    return (
        <>
            {/* Buttons to open modals (optional, or call these from Navbar) */}
            <button onClick={openLogin}>Open Login</button>
            <button onClick={openRegister}>Open Register</button>

            <Login
                isOpen={showLogin}
                onRequestClose={() => setShowLogin(false)}
               openRegister={openRegister}  // This passes the openRegister function correctly
            />


            {/* Register Modal */}
            <SignUp
                isOpen={showRegister}
                onRequestClose={() => setShowRegister(false)}
                openLogin={openLogin}  // Optional: pass to switch back to login
            />
        </>
    );
};

export default AuthModal;




