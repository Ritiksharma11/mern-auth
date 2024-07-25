import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []);

  const handleLogOut = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User LoggedOut');
    setTimeout(() => {
      navigate('/login');
    }, 2000)
  }

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Home