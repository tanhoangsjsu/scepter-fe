import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css"
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const LoginPage = () => {
    const [userName, setUserName] = useState('username')
    const [password, setPassword] = useState('password')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handeLogin = (e) =>{
        e.preventDefault();
        const newUser = {
            username: userName,
            password: password,
        };
        loginUser(newUser,dispatch, navigate)
    }
    return ( 
    <section className ="login-container">
    <div className="login-title"> LOG IN </div>
    <div className="login-input">
        <form>
        <label className="username-label"> USERNAME </label>
        <input
            className="login-username"
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={(e)=> setUserName(e.target.value)}
            />
    
        <label className="password-label"> PASSWORD </label>
        <input
            className="login-password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit" onClick={handeLogin}> Continue </button>
        </form>
        <div className ="login-register">Don't have an account yet?</div>
        <Link className="login-register-link" to="/register">Register Now</Link>
        </div>
    </section>
    );
}
export default LoginPage;