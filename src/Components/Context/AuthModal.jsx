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





// AuthModal কম্পোনেন্টটি হলো একটি parent/controller কম্পোনেন্ট, যেটি নিচের কাজগুলো করে:

// State Manage করে:

// showLogin: Login modal খোলা আছে কিনা তা ঠিক করে।

// showRegister: Register modal খোলা আছে কিনা তা ঠিক করে।

// Control Functions দেয়:

// openLogin(): Login modal খুলে এবং Register modal বন্ধ করে।

// openRegister(): Register modal খুলে এবং Login modal বন্ধ করে।

// Props পাঠায় Child Modal-এ:

// Login কম্পোনেন্টে openRegister পাঠানো হয়, যাতে user চাইলে "Sign up" বাটনে ক্লিক করে Register modal খুলতে পারে।

// SignUp কম্পোনেন্টে openLogin পাঠানো হয়, যাতে "Already have account?" ক্লিক করলে Login modal-এ ফিরে যাওয়া যায়।