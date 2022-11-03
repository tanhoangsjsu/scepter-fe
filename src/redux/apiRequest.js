import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { requestStart } from "./requestSlice";


export const loginUser = async ( user, dispatch, navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("v1/auth/login", user);
        dispatch(loginSuccess(res.data))
        navigate("/homePage");
    } catch (error) {
        dispatch(loginFailed())
    }
}
export const registerUser = async ( user, dispatch, navigate)=>{
    dispatch(registerStart())
    try {
        const res = await axios.post("v1/auth/register", user)
        dispatch(registerSuccess(res.data))
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const requestMaking = ( request, dispatch, navigate)=>{
    dispatch(requestStart())
    try {
        dispatch(registerSuccess(request))
        navigate("/homepage");
    } catch (error) {
        dispatch(registerFailed)
    }
}
