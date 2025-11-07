import React, { useState, useEffect } from "react" // Added useEffect
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"

const Header = () => {
  const [navList, setNavList] = useState(false)

  // UX Improvement: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (navList) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
    // Cleanup function in case component unmounts
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [navList]) // This effect runs only when 'navList' changes

  // UX Improvement: Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setNavList(false)
  }

  return (
    <>
      <header>
        <div className='container flex'>
          
          {/* UI Improvement: Added a proper logo/brand name element */}
          <div className='logo'>
            <Link to='/' onClick={handleLinkClick}>
              {/* You can replace this span with your <img> tag */}
              <span className="logo-text">SmartAqua</span>
            </Link>
          </div>

          {/* UI Improvement: Wrapped nav in a <nav> semantic tag */}
          <nav className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link 
                    to={list.path} 
                    onClick={handleLinkClick} // Add click handler
                  >
                    {list.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='header-right'>
            <div className="user">
              <i className="fa fa-user"></i>
              {/* UX Improvement: This text will hide on smaller screens */}
              <h4 className="user-welcome-text">Hi Ram, Welcome</h4>
            </div>

            <div className='button'>
              <Link to={"/login"}>
                <button className='btn-login'>
                  <i className='fa fa-sign-out'></i>
                  {/* UX Improvement: This text will hide on smaller screens */}
                  <span className="button-text">Logout</span>
                </button>
              </Link>
            </div>
          </div>

          <div className='toggle'>
            {/* Accessibility Improvement: Added aria-label and aria-expanded */}
            <button
              onClick={() => setNavList(!navList)}
              aria-label={navList ? "Close navigation" : "Open navigation"}
              aria-expanded={navList}
            >
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header