import { useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "react-bootstrap";

// Users Component
export const Users = () => {
  //created a state user
  const [emp, setEmp] = useState([]);
  const EMP_URL = "/emp";
   
  // useEffect to render on update of users
  useEffect(() => {
    (async()=>{
      try{
        const res = await axios.get(EMP_URL);
        setEmp(res.data)
      } catch(error){
        console.log(error);
      }
    })()  
  },[emp]);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-5" id='heading'>Users</h1>
      <Table striped hover variant="dark" responsive size="sm">
        <thead>
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">EmpId</th>
            <th scope="col">City</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* maping the Employee  */}
          {emp.map((e, i) => (
            <tr key={i} className="text-center">
              <td>{i=i+1}</td>
              <td>{e.Firstname}</td>
              <td>{e.Lastname}</td>
              <td>{e.EmpId}</td>
              <td>{e.City}</td>
              <td>
              <Link to={`/view/${e.EmpId}`}>
                  <IconButton color="primary" aria-label="view">
                    <PreviewIcon />
                  </IconButton>
                </Link>
                {/*create a link to Edit */}
                <Link to={`/edit/${e.EmpId}`}>
                  <IconButton color="primary" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  aria-label="delete"
                  //deleting the user on API
                  onClick={async() => {
                    await axios.delete(
                      `${EMP_URL}/${e.EmpId}`
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};