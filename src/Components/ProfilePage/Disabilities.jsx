import { useNavigate } from "react-router-dom";

const Disabilities = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="profile-disabilities">
        <p className="profile-disability">Disability 1</p>
        <p className="profile-disability">Disability 2</p>
        <p className="profile-disability">Disability 3</p>
      </div>
    </>
  )
}

export default Disabilities;