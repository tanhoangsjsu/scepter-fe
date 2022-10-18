import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login';
import SignUp from './Components/SignUpPage/SignUp';
import Context from './Context/Context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState } from 'react';
import Toast from './Components/Toast/Toast';
import HomePage from './Components/HomePage/HomePage';
function App() {
  const [isRegister,setRegister]= useState(false)
  const [isLogin,setLogin]= useState(false)
  const [isLoading, setIsLoading] = useState(false);
  // user state contains authenticated user.
  const [user, setUser] = useState(null);
  // comet chat.
  const [cometChat, setCometChat] = useState(null);
  // selected from, selected to.
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  // created ride request.
  const [rideRequest, setRideRequest] = useState(null);
  // current ride.
  const [currentRide, setCurrentRide] = useState(null);
  return (
    <Context.Provider value={{
      isLoading, setIsLoading, 
      user, setUser, 
      cometChat, 
      selectedFrom,setSelectedFrom, 
      selectedTo, setSelectedTo, 
      rideRequest, setRideRequest, 
      currentRide, setCurrentRide
      }}>
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/register"
                    element={isRegister ? <Navigate to="/login" /> : <SignUp setRegister={setRegister}/>}
                />
              <Route
                    path="/login"
                    element={isLogin ? <Navigate to="/HomePage" /> : <LoginPage setLogin={setLogin}/>}
                />
              <Route path="/HomePage" element={<HomePage/>} />
            </Routes>
            <Toast/>

        </div>
        
    </Router>
    </Context.Provider>
    
  );
}

export default App;
