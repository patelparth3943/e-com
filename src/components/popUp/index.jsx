// src/components/Notification.jsx
import React, { useEffect } from 'react';

function popUp({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {message}
        </div>
    );
}

export default popUp;
