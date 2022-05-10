import { Users } from "./Curd/Users";
import useAuth from "./hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  

  return (
    <div>
      <h1 className='d-flex justify-content-center'>Welcome {auth.user}</h1>
      <Users />
    </div>
  );
};

export default Home;
