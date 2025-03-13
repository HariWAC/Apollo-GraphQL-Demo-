import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/Login.css';

//made the change in the ui

const Login = () => {
  const [profile, setProfile] = useState(null);
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setProfile({ name: "User", picture: { data: { url: "profile.jpg" } } });
    }
  }, []);

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Successful:", response);
    localStorage.setItem("authToken", response?.credential);
    setProfile({
      name: response?.name || "User",
      picture: response?.picture || { data: { url: "profile.jpg" } },
    });
    setProvider("google");
    toast.success('Successfully logged in with Google!');
  };

  const handleFacebookLoginSuccess = (response) => {
    console.log("Facebook Login Successful:", response);
    setProfile({
      name: response?.data?.name || "User",
      picture: response?.data?.picture || { data: { url: "profile.jpg" } },
    });
    setProvider("facebook");
    toast.success('Successfully logged in with Facebook!');
  };

  const performLogout = () => {
    const token = localStorage.getItem("authToken");
    
    if (provider === "google" && window.google && token) {
      window.google.accounts.id.revoke(token, () => {
        cleanupAndRedirect('Google');
      });
    } else {
      cleanupAndRedirect(provider || 'current account');
    }
  };

  const cleanupAndRedirect = (providerName) => {
    localStorage.removeItem("authToken");
    setProfile(null);
    setProvider(null);
    toast.success(`Successfully logged out from ${providerName}!`, {
      onClose: () => {
        navigate('/login');
      }
    });
  };

  const handleLogout = () => {
    const toastId = toast.info(
      <div className="logout-confirmation">
        <p>Do you want to logout?</p>
        <div className="logout-buttons">
          <button
            className="logout-yes"
            onClick={() => {
              toast.dismiss(toastId);
              performLogout();
            }}
          >
            Yes
          </button>
          <button
            className="logout-no"
            onClick={() => toast.dismiss(toastId)}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        className: 'custom-toast',
        style: {
          background: 'transparent',
          boxShadow: 'none',
        },
      }
    );
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {profile ? (
          <div className="profile-container">
            <div className="profile-image-container">
              <div className="profile-image-blur"></div>
              <img 
                src={profile.picture.data.url} 
                alt="Profile" 
                className="profile-image"
              />
            </div>
            
            <div className="profile-info">
              <h2 className="welcome-text">Welcome back!</h2>
              <p className="profile-name">{profile.name}</p>
              <p className="login-provider">
                Logged in with {provider === "google" ? "Google" : "Facebook"}
              </p>
            </div>

            <div className="logout-container">
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="login-form">
            <h2>Welcome</h2>
            <p>Please sign in with your social account to continue</p>
            
            <div className="social-buttons">
              <div className="social-button-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Google Login Failed");
                    toast.error('Google login failed. Please try again.');
                  }}
                />
              </div>
              
              <div className="social-button-wrapper">
                <LoginSocialFacebook
                  appId="1614481042500778"
                  onResolve={handleFacebookLoginSuccess}
                  onReject={(error) => {
                    console.log("Facebook Login Failed:", error);
                    toast.error('Facebook login failed. Please try again.');
                  }}
                >
                  <FacebookLoginButton />
                </LoginSocialFacebook>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
