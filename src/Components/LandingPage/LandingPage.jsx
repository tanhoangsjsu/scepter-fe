import './landing.css'
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate();
    const goToSignIn = () => {
      navigate("/login");
    };
    const goToSignUp = () => {
      navigate("/register");
    };
    return (  
    <section className="landing-container">
        <div className="landing-header"> SCEPTER</div>
        <span className="beta"> Beta </span>
        <div className="button-container">
            <button className="login" onClick={goToSignIn}>
            Sign in
            </button>
            <button className="register" onClick={goToSignUp}>
            Sign up
            </button>
        </div>
    </section>
    );
}
 
export default LandingPage
