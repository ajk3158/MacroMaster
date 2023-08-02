import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  //Sets component's toggle state to false 
  const [toggle, setToggle] = useState(false);


  return (
    <nav className="app__navbar">
      {/* full size Navbar links */}
      <ul className="app__navbar-links">
        {['home', 'calculator'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <Link to={`${item}`}>{item}</Link>
          </li>
        ))}
      </ul>

      </nav>
  );
};

export default Navbar
