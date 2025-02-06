// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from './common/NavbarComponent';
import Home from './common/Home';
import GraphQLForm from './components/Gbody';
import SpaceForm from './components/SpaceForm';
import Login from './components/Login';
// import Logout from './components/Logout';
import Facebook from './components/Facebook';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const handleLoginSuccess = (response) => {
    console.log("User logged in successfully:", response);
    localStorage.setItem("authToken", response.credential);
    toast.success('Successfully logged in!');
  };

  const handleLogout = () => {
    toast.info(
      <div>
        Do you want to logout?
        <div className="mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => {
              localStorage.removeItem("authToken");
              toast.success('Successfully logged out!');
              window.location.href = '/login';
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <Router>
      <ToastContainer position="top-right" />
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/graphqlform"
            element={
              <PrivateRoute>
                <GraphQLForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/spaceform"
            element={
              <PrivateRoute>
                <SpaceForm />
              </PrivateRoute>
            }
          />
          {/* <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;