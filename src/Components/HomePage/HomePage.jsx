import "../HomePage/homepage.css"
import Map from "../Map/Map";
import StudentModal from "../Modals/StudentModal";
import { useSelector } from "react-redux";
import AssistanceModal from "../Modals/AssistanceModal";

const HomePage = () => {
  const userRole = useSelector((state)=> state.auth.login.currentUser.role);
  return ( 
    <>
    <div className ="home-container">
      <Map/>
      {userRole === 'student'&& <StudentModal/>}
      {userRole === 'assistance' && <AssistanceModal/>}
    </div>
    </>
  );
}
export default HomePage;