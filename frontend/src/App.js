import { Routes, Route } from "react-router-dom";
import {Adduser} from './Components/Curd/Adduser';
import {Edit} from './Components/Curd/Edit';
import { Navbar } from "./Components/Curd/Navbar";
import Unauthorized from "./Components/Unauthorized";
import Missing from "./Components/Missing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { AuthProvider } from "./Components/context/AuthProvider";
import RequireAuth from "./Components/RequireAuth";
import {View} from "./Components/Curd/View";
import Home from "./Components/Home";
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/*these routes are protected */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/edit/:u" element={<Edit />} />
          <Route path="/view/:u" element={<View />} />
          </Route>
        
          {/* catch all */}
          <Route path="*" element={<Missing/>} />
          
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
