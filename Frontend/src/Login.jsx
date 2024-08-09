import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'



const apiURL = 'https://crud-backend-0aoh.onrender.com/'


export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();


  const submitLogin = async () => {

    try {
      const response = await fetch(`${apiURL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameInput, passwordInput })
      })
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        setMessage(data.message)
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', usernameInput);
        navigate(`/UserInventory/${data.user.id}`)

      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('An error occurred. Please try again.')
    }

  }
  useEffect(() => {
    console.log(message);
  }, [message]);


  return (
    <>
      <h1>Login In or Create an Account</h1 >
      <InputText placeholder='Username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
      <Password placeholder='Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} feedback={false} tabIndex={1} />
      <Button className="button" label="Login" onClick={submitLogin} />
      <Link to='/signup'><Button className="button" label="Create New Account" /></Link>
    </>
  )
}