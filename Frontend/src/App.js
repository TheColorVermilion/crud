import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { HomePage } from './HomePage'
import { NavBar } from './NavBar'
import { Login } from './Login'
import { ItemDetails } from './ItemDetails'
import { UserInventory } from './UserInventory'
import { NewItem } from './NewItem'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ItemDetails/:id' element={<ItemDetails/>}/>
          <Route path='/UserInventory/:id' element={<UserInventory/>}/>
          <Route path='/NewItem' element={<NewItem/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
