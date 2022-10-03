import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {  
    return(
        <section className="register-container">
    <div className="register-title"> SIGN UP </div>
    <div className="register-input">
        <form>
        <label className="email-label"> EMAIL </label>
        <input
            required
            className="register-email"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            // onChange={formik.handleChange}
            // value={formik.values.email}
        />

        <label className="username-label"> USERNAME </label>
        <input
            className="register-username"
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            // value={formik.values.username}
            // onChange={formik.handleChange}
            />
        {/* {formik.errors.username && (
            <p className="errorMsg">{formik.errors.username}</p>
          )} */}
        <label className="password-label"> PASSWORD </label>
        <input
            className="register-password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            // value={formik.values.password}
            // onChange={formik.handleChange}
        />
        {/* {formik.errors.password && (
            <p className="errorMsg">{formik.errors.password}</p>
        )}
          {error && <p className="register-err"> {error.substr(50).replace("to be unique","already existed")} </p>} */}
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