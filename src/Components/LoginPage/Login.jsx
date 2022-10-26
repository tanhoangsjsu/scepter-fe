import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import "./login.css"
import axios from 'axios'
import io from "socket.io-client"

function Dummy() {}



const LoginPage = (props) => {
    const [userName, setUserName] = useState('username')
    const [password, setPassword] = useState('password')
    const navigate = useNavigate();
    const handeLogin = (e) =>{
        // var io = require('socket.io-client');
        console.log("In handeLogin");
        e.preventDefault();
        const newUser = {
            username: userName,
            password: password,
        };
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/auth/login',
            data: newUser,
            config: {headers: {'Content-Type':'application/x-www-form-urlencoded'}}

        })
        .then(function (response){
            //handle success
            console.log(response)
            toast.success('Sucessfully Login')
            if(response.status === 200){
                props.setLogin(true)
            }
        })
        .catch(function (response){
            //handle error 
            toast.error("Wrong username or password")
            console.log(response)
        });

        console.log("Going to connect..");
        const socket = io('http://localhost:9000', {reconnect: true});


        socket.on('connect', function (socket) {
            console.log('Socket-IO Connected!');
        });

        socket.on("NewUser", (msg) => {
            console.log("New user has joined");
        });

        console.log("Emitting Login Event! ");
        // setTimeout(Dummy,60000);
        socket.emit("Login", 'TESTING');
        console.log("Login event Sent");
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