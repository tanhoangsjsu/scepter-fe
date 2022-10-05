import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login';
import SignUp from './Components/SignUpPage/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
