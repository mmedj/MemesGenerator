import React from 'react';
import './Navbar.css'; // Import the CSS file with the defined classes

const Navbar = () => {
    return (
        <header className="Wrapper">
            <nav className="Content logo">
				<h1 className="logo title fw-bold fs-1">Meme<span className='logo'>Lab</span></h1>            </nav>
        </header>
    );
};

export default Navbar;
