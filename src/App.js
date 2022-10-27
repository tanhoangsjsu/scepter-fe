import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login';
import SignUp from './Components/SignUpPage/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Search from './Components/Search/Search';
function App() {
  return (
  
    <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<SignUp/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/HomePage" element={<HomePage/>} />
              <Route path="/search" element={<Search/>} />
            </Routes>

        </div>
        
    </Router>
    
  );
}

export default App;
