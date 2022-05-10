import {useState} from 'react';
import { useParams,useNavigate} from "react-router-dom";
import axios from 'axios';

// View component
export const View = ({ users }) => {
  const [emp,setEmp] = useState({});
  const navigate = useNavigate();
  const {u} = useParams();
  
    const load = async() => {
      try{
          const res = await axios.get(`http://localhost:5500/emp/${u}`);
        setEmp(res.data);
      } catch(error){
        console.log(error);
      }
    }
  load();
  
  
  // displaying the user details
  return (
    <div className='container'>
    <div className='card'>
      <h1>{`Welcome ${emp.Firstname}`}</h1>
      <br/>
      <h3>Firstname:{emp.Firstname}</h3>
      <h3>Lasttname:{emp.Lastname}</h3>
      <h3>Employee_ID:{emp.EmpId}</h3>
      <h3>City:{emp.City}</h3> 
      <button className='bt' onClick={()=>{navigate('/', { replace: true });}}>Back</button>
      </div>
    </div>
  );
};

