import React from 'react';
import {FaRegCopyright} from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="footer-links">

                    </div>
                    <p className="flex items-center gap-1">
                        <FaRegCopyright/>
                        2025 Rasmus Homepage. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
