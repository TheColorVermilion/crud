import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'


export const NavBar = () =>{
  return(
    <>
    <Link to='/home'><Button label='Home'/></Link>
    <Link to='/login'><Button label='Log In'/></Link>
    </>
  )
}