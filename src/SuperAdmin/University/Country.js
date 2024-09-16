import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

const GmailAPI = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());

        // Listen for sign-in state changes
        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const sendEmail = () => {
    const message = `
      From: 'your_email@gmail.com'
      To: 'recipient_email@gmail.com'
      Subject: 'Test Email'
      
      This is a test email from Gmail API
    `;

    const base64EncodedEmail = btoa(unescape(encodeURIComponent(message)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: base64EncodedEmail,
      },
    }).then(response => {
      console.log('Email sent', response);
    }).catch(err => {
      console.error('Error sending email', err);
    });
  };

  return (
    <div>
      <h2>Gmail API with React</h2>
      {isSignedIn ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={sendEmail}>Send Email</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default GmailAPI;
