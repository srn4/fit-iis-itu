import React from 'react';
import axios from 'axios';

function Logout() {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the stored token
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token'); // Remove the token from localStorage
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
