import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

//TBD: SECURITY RISK - read from a secure configuration file
Amplify.configure({
      Auth: {
        region: "ap-south-1",
        userPoolId: "ap-south-1_Q1ISk6bEB",
        userPoolWebClientId: "5q0v80sa87a54215u0h2acpjnt",
      },
    });

const AuthPage = () => (
  <AmplifyAuthenticator>
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);

export default AuthPage;
