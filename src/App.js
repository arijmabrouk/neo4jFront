import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Register from "../src/pages/Register/Register"
import Home from './pages/Home/Home';
import GraphVisualisation from "./pages/GraphVisualisation/GraphVisualisation"
import Login from './pages/Login/Login';
import AppContext from './context/AppContext';
import PateintDashboard from './pages/PateintDashboard/PateintDashboard';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';

function App() {
  const isLoggedIn = () => {
    // Check if the user is logged in based on the presence of a token
    // You may have your own logic to determine if the user is logged in
    const token = sessionStorage.getItem('token'); // Assuming you store the token in localStorage
    return !!token;
  };
  return (
    <AppContext>

  <BrowserRouter>
  {/* <Routes>
      <Route
        path="/"
        element={isLoggedIn() ? <Navigate to="/PatientDashboard" /> : <Home />}
      />
      <Route
        path="/login"
        element={isLoggedIn() ? <Navigate to="/PatientDashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isLoggedIn() ? <Navigate to="/PatientDashboard" /> : <Register />}
      />
      <Route
        path="/PatientDashboard"
        element={isLoggedIn() ? <PateintDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/graph"
        element={isLoggedIn() ? <GraphVisualisation /> : <Navigate to="/login" />}
      />
      <Route
        path="/DoctorDashboard"
        element={isLoggedIn() ? <DoctorDashboard /> : <Navigate to="/login" />}
      />
    </Routes> */}
  <Routes>
    <Route path='/' element={<Home/>} /> 
    <Route path='/Register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/PatientDashboard' element={<PateintDashboard />} />
    <Route path='/graph' element={<GraphVisualisation/>}/>
    <Route path='/DoctorDashboard' element={<DoctorDashboard/>}/>

           
  </Routes>
  </BrowserRouter>
 </AppContext> 
  );
}

export default App;
