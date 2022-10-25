import "../HomePage/homepage.css"
import Map from "../Map/Map";
import StudentModal from "../Modals/StudentModal";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userRole = useSelector((state)=> state.auth.login.currentUser.role);
  console.log(userRole)
  return ( 
    <>
    <div className ="home-container">
      <Map/>
      <StudentModal/>
    </div>
    </>
  );
}
export default HomePage;