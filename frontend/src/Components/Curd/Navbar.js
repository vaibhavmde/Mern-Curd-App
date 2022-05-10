import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Navbar component
export const Navbar = () => {

  const { auth,setAuth } = useAuth();
  const navigate = useNavigate();
  const logout =  () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/login');
}
  return (
    <nav className="navbar navbar-expand-md" id='nav'>
      <div className="container-fluid">
        <span className="navbar-brand font-monospace fw-bold fs-4" title="React-app" id='nav'>
          React
        </span>
        <button
          className="navbar-toggler"
          title="Toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          color='dark'
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* Link to Home */}
              <Link className="nav-link active" aria-current="page" to="/">
                <IconButton title='Home'>
                  <HomeIcon />
                </IconButton>
              </Link>
            </li>
          </ul>
          <div>
          {/* Add user button to link to addUser component */}
          <Link to="/adduser">
            <IconButton  title="Add-User">
              <PersonAddAltIcon />
            </IconButton>
          </Link>
          </div>
          <div className="px-4">
          {auth?.user?(<button className="navbar-brand" id="nav" title="Sign Out" onClick={logout}>
            Sign Out
          </button>):(<></>)}
          </div>
        </div>
      </div>
    </nav>
  );
};