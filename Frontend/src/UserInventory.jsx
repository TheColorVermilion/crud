import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';

const apiURL = 'http://localhost:5080/'
export const UserInventory = () => {
  const [userInventory, setUserInventory] = useState([]);
  const { id } = useParams();
  const userId = Number(localStorage.getItem('userId'));
  const username = localStorage.getItem('username');



  const fetchUserInventory = async () => {
    try {
      const response = await fetch(`${apiURL}users/${id}`);
      const data = await response.json();
      setUserInventory(data.map(item => ({
        id: item.item_id,
        seller: item.user_id,
        name: item.item_name,
        description: item.description,
        inStock: item.quantity
      })))
    } catch (err) {
      console.error(err)
    }
  }

  const editItem = () => {

  }

  const deleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${apiURL}deleteitem/${itemId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log(await response.json());
          fetchUserInventory();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    fetchUserInventory();
  }, []);


  return (
    <>
    <Card>
    <h1>{username}'s Inventory</h1>
    <p>to edit or delete idividual items click on them </p>
    <Link to ='/NewItem'><Button label='Add Item to your Inventory'/></Link>
    </Card>


      <div>
        {userInventory.map((item) => (
          <Card key={item.id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>number left in stock: {item.inStock}</p>
            <Button onClick={editItem} label='Edit'/>
            <Button onClick={() => deleteItem(item.id)}label='Delete'/>
          </Card>
        ))}
      </div>
    </>
  )
}
