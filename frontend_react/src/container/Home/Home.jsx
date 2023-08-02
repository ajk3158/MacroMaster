import React from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import './Home.scss';

const Home = () => {
  return (
    <div id="home" className="app__home app__flex">

      <h2 className="head-text"> <span>Welcome to MacroMaster</span> </h2>
      <motion.div
        whileInView={{ y: [100, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="app__home-logo"
      >
        <img src={images.primarylogo} alt="primary logo" />
        <motion.img
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="overlay_circle"
          src={images.circle}
          alt="profile_circle"
        />
      </motion.div>

      <div className="app__home-buttons">
        <a href="/calculator" className="app__home-button p-text">
          Calculate Optimal Protein Foods
        </a>

        <a type="button" className="app__home-button p-text">
          asdfa
        </a>
      </div>
    </div>
  )
}

export default AppWrap(Home, 'home');