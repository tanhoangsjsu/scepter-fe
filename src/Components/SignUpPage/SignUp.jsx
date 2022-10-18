import { useRef, useState } from "react";
import { Link, browserHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import "./signup.css";
import {useFormik} from "formik"
import * as Yup from "yup"
import axios from 'axios'
const SignUp = (props) => {  
    const studentRole = 'student';
    const assistanceRole = 'assistance';
    const roleRef = useRef(null);
    const formik = useFormik({
        initialValues:{
            email:"",
            username:"",
            password:"",
            role: roleRef
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .max(20, "Maximum 20 characters")
            .min(6, "Minimum 6 characters")
            .required("Required"),
            email: Yup.string()
            .required("Required")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter valid email address"),
            password: Yup.string()
            .required("Required")
            .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/,
            "Minimum 6 characters, at least one letter, one number, one special character"
            ), 
        }), 

        onSubmit:(values)=>{
            let currentRole = roleRef.current.value
            console.log(values)


            // Send a POST request
        axios.post('http://localhost:8000/v1/auth/register', { 
            email: values.email,
            username: values.username,
            role: currentRole,
            password: values.password,
        })
        .then(function (response){
            //handle success
            console.log(response)
            if(response.status === 200){
                props.setRegister(true)
                toast.success('Sign Up Success')
            }
        })
        .catch(function (response){
            //handle error 
            toast.error('Username or Email is taken')
            console.log(response)
        })
        ;
        }
    })
    return(
<section className="register-container">
    <div className="register-title"> SIGN UP </div>
    <div className="register-input">
        <form className="infoForm" onSubmit={formik.handleSubmit}>
        <label className="email-label"> EMAIL </label>
        <input
            required
            className="register-email"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
        />
        {formik.errors.email && (
            <p className="errorMsg">{formik.errors.email}</p>
        )}
        <label className="username-label"> USERNAME </label>
        <input
            className="register-username"
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            />
        {formik.errors.username && (
            <p className="errorMsg">{formik.errors.username}</p>
        )}
        <label className="role-label"> ROLE </label>
        <select ref={roleRef} defaultValue={studentRole} >
            <option value={studentRole}>Student</option>
            <option value={assistanceRole}>Assistance</option>
        </select>
        <label className="password-label"> PASSWORD </label>
        <input
            className="register-password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
        />
        {formik.errors.password && (
            <p className="errorMsg">{formik.errors.password}</p>
        )}
        <button type="submit"> Create account </button>
        </form>
        <div className="register-login"> Already have an account? </div>
        <Link className="register-login-link" to="/login">Log in</Link>
    </div>
</section>
)
}
export default SignUp;