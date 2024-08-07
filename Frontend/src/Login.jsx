import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'



const apiURL = 'http://localhost:5080/'


export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [message, setMessage] = useState('')

  const submitLogin = async () => {
    try {
      const response = await fetch(`${apiURL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({usernameInput, passwordInput})
      })
      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        console.log(message)
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('An error occurred. Please try again.')
    }

  }

  return (
    <>
      <h1>Login In or Create an Account</h1>
      <InputText placeholder='Username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
      <Password placeholder='Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} feedback={false} tabIndex={1} />
      <Button label="Login" onClick={submitLogin} />
      <Link to='/signup'><Button label="create new account" /></Link>
    </>
  )
}