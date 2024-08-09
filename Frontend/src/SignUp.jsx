import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react'

const apiURL = 'http://localhost:5080/'

//https://crud-backend-0aoh.onrender.com/

export const NewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastname] = useState('')
  const [message, setMessage] = useState('')

  const createUser = async () => {
    try {
      const response = await fetch(`${apiURL}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username: username,
        password: password,
        })
      })
      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)

      } else {
        setMessage(data.message)
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
      <h1>Enter your Details Below</h1>
      <Card>
        <InputText placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
        <InputText placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <InputText placeholder="Username" value={username} onChange={(e) =>  setUsername(e.target.value)} />
        <InputText placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link to={`/login`}><Button className="button" label='Submit' onClick={createUser} /></Link>
      </Card>
    </>
  )
}