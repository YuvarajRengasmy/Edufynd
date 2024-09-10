import React from 'react';
import FacebookLogin from 'react-facebook-login';

const Facebook = () => {
  const responseFacebook = (response) => {
    console.log(response);
    // You can handle the response here
    // like storing user data, redirecting, etc.
  };

  return (
    <div>
      <h2>Facebook Login</h2>
      <FacebookLogin
        appId="521433973800512" // Replace this with your Facebook App ID
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default Facebook;
