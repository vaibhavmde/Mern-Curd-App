import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "./api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const {setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(accessToken,roles);
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
         toast.error('No Server Response')
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password")
      } else if (err.response?.status === 401) {
        toast.error('Unauthorized')
      } else {
        toast.error("Login Failed")
      }
    }
  };
 

  return (
    <div className="log">
    <section>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
    <ToastContainer />
    </div>
  );
};

export default Login;
