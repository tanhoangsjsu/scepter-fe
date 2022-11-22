import "./profilepage.css"
import UserImage from "../../assest/Avatar.png"
import { useSelector } from "react-redux"
import Skills from "./Skills"
import Disabilities from "./Disabilities"

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <div className="profile-page">
      <div className="profile-page-header">
          <img className="profile-image" src={UserImage} alt="profile" />
          <h1 className="profile-name">{user.username}</h1>
      </div>
      <div className="profile-details">
        {user.role === "assistance" ? <Skills />: <Disabilities/>}
      </div>
    </div>
  )
}
export default ProfilePage;