import { Link, useNavigate } from "react-router-dom";
import "./login.css"
const LoginPage = () => {
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
            // value={formik.values.username}
            // onChange={formik.handleChange}
            />
        {/* {formik.errors.username && (
            <p className="errorMsg">{formik.errors.username}</p>
          )} */}
        <label className="password-label"> PASSWORD </label>
        <input
            className="login-password"
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
        <button type="submit"> Continue </button>
        </form>
        <div className ="login-register">Don't have an account yet?</div>
        <Link className="login-register-link" to="/register">
            Register Now
        </Link>
        </div>
     </section>
     );
}
 
export default LoginPage;