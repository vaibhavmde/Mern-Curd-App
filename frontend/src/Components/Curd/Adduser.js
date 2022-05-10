import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Addemp Component
export const Adduser = () => {
  let navigate = useNavigate(); //to navigate to home page

  //created a state emp
  const [emp, setEmp] = useState({
    Firstname: "",
    Lastname: "",
    EmpId: "",
    City: "",
  });
  const EMP_URL = "/emp";

  //destructuring of Object
  const { Firstname, Lastname, EmpId, City } = emp;

  //OnInput function to take values of emp
  const onInput = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  return (
    <div className="add">
      <h1 className="d-flex justify-content-center" id="heading">
        Addemp
      </h1>
      <form
        id="fm"
        className="d-flex flex-column m-2 "
        onSubmit={async (e) => {
          e.preventDefault();
          //adding the emp to API

          try {
             const res = await axios.post(
                 EMP_URL,
                 JSON.stringify({ Firstname, Lastname, EmpId, City }),
                {
                headers: { "Content-Type": "application/json" },
                // withCredentials: true,
                }
                );
            // TODO: remove console.logs before deployment
            console.log(res.data);
          } catch (err) {
            // console.log(err.response.data==='Conflict');
            if(err.response.data==='Conflict'||err.response.data==='')
             return toast.error('User already Exists');
          }
          //Navigating back to Home
          navigate("/");
        }}
      >
        <FormControl>
          <TextField
            focused
            id="demo"
            variant="standard"
            color="primary"
            autoComplete="off"
            name="Firstname"
            value={Firstname}
            onChange={(e) => onInput(e)}
            label="FirstName"
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            focused
            autoComplete="off"
            id="demo"
            variant="standard"
            color="primary"
            name="Lastname"
            value={Lastname}
            onChange={(e) => onInput(e)}
            label="LastName"
            required
          />
        </FormControl>

        <br />
        <FormControl>
          <TextField
            focused
            autoComplete="off"
            variant="standard"
            color="primary"
            id="demo"
            type="number"
            name="EmpId"
            value={EmpId}
            onChange={(e) => onInput(e)}
            label="Employee ID"
            required
          />
        </FormControl>

        <br />
        <FormControl>
          <TextField
            focused
            id="demo"
            autoComplete="off"
            variant="standard"
            color="primary"
            name="City"
            value={City}
            onChange={(e) => onInput(e)}
            label="City"
            required
          />
        </FormControl>
        <br />
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            ADD
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
