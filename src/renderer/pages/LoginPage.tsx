// import { Navigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authToken = useReadLocalStorage('access_token');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useLocalStorage('access_token', '');
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const processForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (passwordRef.current && emailRef.current) {
        const data = JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        const { data: responseData } = await axios({
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/v1/auth/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        });

        if (responseData.access_token) {
          setToken(responseData.access_token);
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  if (authToken) {
    return <Navigate to="/add-user" />;
  }
  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <div className="login-form-wrap">
        <div className="form-elem">
          <input type="text" ref={emailRef} placeholder="email" />
        </div>
        <div className="form-elem">
          <input type="password" ref={passwordRef} placeholder="password" />
        </div>
        <div className="form-elem">
          <button type="button" onClick={processForm}>
            Login
          </button>
        </div>
      </div>
      {error && <p className="error-info">{error}</p>}
    </div>
  );
}

export default LoginPage;
