import axios, { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

function AddUsersPage() {
  const authToken = useReadLocalStorage('access_token');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const typeHandler = () => {
    setError(null);
  };
  const handleForm = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      if (!(nameRef.current && emailRef.current && passRef.current)) {
        throw new Error('Check fields please');
      }
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passRef.current.value;
      const data = {
        name,
        email,
        password,
      };
      await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/v1/add-user`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data,
      });
      nameRef.current.value = '';
      emailRef.current.value = '';
      passRef.current.value = '';
      alert('User succesfully created');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <>
      <div className="create-user-page">
        <h2>Add User Page</h2>
        <div className="create-user-form">
          <div className="form-elem">
            <input
              type="text"
              ref={nameRef}
              placeholder="name"
              onKeyDown={typeHandler}
            />
          </div>
          <div className="form-elem">
            <input
              type="text"
              ref={emailRef}
              placeholder="email"
              onKeyDown={typeHandler}
            />
          </div>
          <div className="form-elem">
            <input
              type="password"
              ref={passRef}
              placeholder="password"
              onKeyDown={typeHandler}
            />
          </div>
          <div className="create-user-form-elem">
            <button type="button" onClick={handleForm}>
              Add user
            </button>
          </div>
        </div>
      </div>

      {error && <p className="error-info">{error}</p>}
    </>
  );
}

export default AddUsersPage;
