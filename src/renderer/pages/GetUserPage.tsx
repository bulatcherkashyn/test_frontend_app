import axios, { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import UserInfo from '../components/UserInfo';

function GetUserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const authToken = useReadLocalStorage('access_token');
  const handleForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    setUser(null);
    setError(null);
    try {
      if (idRef.current) {
        const userID = idRef.current.value;
        const { data: responseData } = await axios({
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://localhost:3000/api/v1/get-user/${userID}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(responseData);
        idRef.current.value = '';
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <div className="get-user-page">
      <h2>Get User Page</h2>

      <div className="get-user-form">
        <input type="text" ref={idRef} placeholder="enter user id" />
        <button type="button" onClick={handleForm}>
          Find
        </button>
      </div>
      {user && <UserInfo user={user} />}
      {error && <p className="error-info">{error}</p>}
    </div>
  );
}

export default GetUserPage;
