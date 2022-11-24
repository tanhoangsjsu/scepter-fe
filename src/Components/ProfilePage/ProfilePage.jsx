import "./profilepage.css"
import UserImage from "../../assest/Avatar.png"
import { useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const showDisabilities = () => {
    setIsClicked(!isClicked);
    navigate("disabilities");
  }

  const showSkills = () => {
    setIsClicked(!isClicked);
    navigate("skills");
  }

  const goToPreviousPage = () => {
    setIsClicked(!isClicked);
    navigate("/profile");
  }

  const showDisabilitiesButton = () => {
    if (isClicked) {
      return (
        <>
          <Outlet />
          <button className="hide-disabilities-button" onClick={goToPreviousPage}>
            Hide
          </button>
        </>
      )
    } else {
      return (
        <button className="show-disabilities-button" onClick={showDisabilities}>
          Disabilities
        </button>
      )
    }
  }

  const showSkillsButton = () => {
    if (isClicked) {
      return (
        <>
          <Outlet />
          <button className="hide-disabilities-button" onClick={goToPreviousPage}>
            Hide
          </button>
        </>
      )
    } else {
      return (
        <button className="show-skills-button" onClick={showSkills}>
          Skills
        </button>
      )
    }
  }

  const showProfileDetails = () => {
    if (user.role === "student") {
      return (
        <div className="show-profile-details-disabilities">
          {showDisabilitiesButton()}
        </div>
      )
    } else {
      return (
        <div className="show-profile-details-skills">
          {showSkillsButton()}
        </div>
      )
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-page-header">
          <img className="profile-image" src={UserImage} alt="profile" />
          <h1 className="profile-name">{user.username}</h1>
      </div>
      <div className="profile-details">
        {showProfileDetails()}
      </div>
      <div className="signout-container">
        <button className="signout-button">Sign Out</button>
      </div>
    </div>
  )
}
export default ProfilePage;