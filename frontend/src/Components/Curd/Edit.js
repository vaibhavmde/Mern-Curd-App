import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from '../api/axios';

// Edit Component
export const Edit = () => {
  //created a state emp
  const [emp, setEmp] = useState({
    Firstname: "",
    Lastname: "",
    EmpId: "",
    City: ""
  });

  //Object destructuring
  const { Firstname, Lastname, EmpId, City } = emp;
  const EMP_URL = "/emp";
  const { u } = useParams();
  let navigate = useNavigate();

  //useEffect hook to render on change of u
  useEffect(() => {
    (async()=>{
     await axios
      .get(`${EMP_URL}/${u}`)
      .then((response) => setEmp(response.data));
    })()
    
  }, [u]);

  // OnInput function to take input from emp
  const onInput = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit">
      <h1 id='heading'>Edit</h1>
      <form id='fm'
        className="d-flex flex-column m-2 "
        onSubmit={async(e) => {
          e.preventDefault();
          // Update the emp to API
          await axios.put(
            `http://localhost:5500/emp/${u}`,
            JSON.stringify({Firstname, Lastname, EmpId, City}),
            {
              headers: { "Content-Type": "application/json" },
              // withCredentials: true
            }
          );
          //navigating back to Home
          navigate("/");
        }}
      >
        <FormControl>
          <TextField
            id="demo"
            variant="standard"
            focused
            color="primary"
            name="Firstname"
            autoComplete="off"
            value={Firstname}
            required
            onChange={(e) => onInput(e)}
            label="FirstName"
          />
        </FormControl>
       
        <br />
        <FormControl>
          <TextField
            id="demo"
            focused
            variant="standard"
            color="primary"
            required
            autoComplete="off"
            name="Lastname"
            value={Lastname}
            onChange={(e) => onInput(e)}
            label="LastName"
          />
        </FormControl>
       
        <br />
        <FormControl>
          <TextField
            focused
            color="primary"
            variant="standard"
            autoComplete="off"
            id="demo"
            required
            type="number"
            name="EmpId"
            value={EmpId}
            onChange={(e) => onInput(e)}
            label="Employee ID"
          />
        </FormControl>
        
        <br />
        <FormControl>
          <TextField
            id="demo"
            focused
            variant="standard"
            autoComplete="off"
            color="primary"
            required
            name="City"
            value={City}
            onChange={(e) => onInput(e)}
            label="City"
          />
        </FormControl>
       
        <br />
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};