import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import {useFormik} from "formik"
import * as Yup from "yup"
import axios from 'axios'
const SignUp = () => {  
    const formik = useFormik({
        initialValues:{
            email:"",
            username:"",
            password:""
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
            console.log(values)
            let formData = new FormData();
            formData.append('username',values.username)
            formData.append('password',values.password)
            formData.append('email',values.email)

        // Send a POST request
        axios({
            method: 'post',
            url: 'http://localhost:8000/register',
            data: formData,
            config: {headers: {'Content-Type':'application/x-www-form-urlencoded'}}

        })
        .then(function (response){
            //handle success
            console.log(response)
            alert('New User Sucessfully Added. ')
        })
        .catch(function (response){
            //handle error 
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
        <Link className="register-login-link" to="/login">
            Log in
        </Link>
    </div>
</section>
)
}
 
export default SignUp;