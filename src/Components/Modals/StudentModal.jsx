import "../Modals/modal.css"
import { useNavigate } from "react-router-dom";
import UserImage from "../../assest/Avatar.png"
import Car from "../../assest/Car.svg"
import Wheels from "../../assest/Wheels.png"
import Text from "../../assest/Text.svg"
import { useSelector } from "react-redux";
const StudentModal = () => {
    const navigate = useNavigate();
    const user = useSelector((state)=> state.auth.login.currentUser);
    const handleclick = ()=>{
        navigate("/search");
    }
    const handleText = () =>{
        alert("Feature not available in the Beta version!!!")
    }
    return (
    <div className="action-items-container">
        <div className="header-container">
            <label className="logo"> SCEPTER </label>
            <div className="profile-container">
                <div className="user-name">{user.username}</div>
                <img clasName ="user-img" src={UserImage}></img>
            </div>
        </div>      
        
        <div className="action-buttons-container">
            <div className="action-button" onClick={handleclick}>
                <img src={Car}></img>
                <h3>Ride</h3>
            </div>
            <div className="action-button" onClick={handleclick}>
                <img src={Wheels}></img>
                    <h3>Wheels</h3>
            </div>
            <div className="action-button" onClick={handleText}>
                <img src={Text}></img>
                <h3>Text</h3>
            </div>
        </div> 
        <div className="input-button" onClick={handleclick}>WHERE TO? </div>
    </div>
    );
}

export default StudentModal;