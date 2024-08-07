import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export const NavBar = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = () => {
      const storedUserId = localStorage.getItem('userId');
      const storedUsername = localStorage.getItem('username');
      setUserId(storedUserId);
      setUsername(storedUsername);
    };

    checkUserData();
    const intervalId = setInterval(checkUserData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const clearLogin = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUserId(null);
    setUsername(null);
    navigate('/login');
  }

  return (
    <>
      {!userId ? (
        <>
          <Link to='/home'><Button label='Home' /></Link>
          <Link to='/login'><Button label='Log In' /></Link>
        </>
      ) : (
        <>
          <Link to='/home'><Button label='Home' /></Link>
          <Link to={`/UserInventory/${userId}`}>
            <Button label={`${username}'s Inventory`} />
          </Link>
          <Button label='Log Out' onClick={clearLogin} />
        </>
      )}
    </>
  )
}