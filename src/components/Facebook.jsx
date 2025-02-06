import { LoginSocialFacebook } from "reactjs-social-login"; // if it's the right package
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState } from "react";

const Facebook = () => {
  const [profile, setProfile] = useState(null);

  return (
    <div>
      {/* Display the Facebook login button if no profile is available */}
      {!profile && (
        <LoginSocialFacebook
          appId="1614481042500778"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data); // Store profile information after successful login
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      )}

      {/* If profile is available, display the user's profile */}
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Facebook;
