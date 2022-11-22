import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//AUTH

export const loginUser = async ( user, dispatch, navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("v1/auth/login", user);
        dispatch(loginSuccess(res.data))
        navigate("/homepage");
    } catch (error) {
        dispatch(loginFailed(error.response.data))
        console.log(error)
    }
}
export const registerUser = async ( dispatch, navigate)=>{
    dispatch(registerStart())
    try {
        dispatch(registerSuccess())
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed())
    }
}


