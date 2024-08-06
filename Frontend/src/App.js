import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { HomePage } from './HomePage'
import { NavBar } from './NavBar'
import { Login } from './Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
