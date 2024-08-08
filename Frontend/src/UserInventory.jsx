import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const apiURL = 'http://localhost:5080/';

export const UserInventory = () => {
  const [userInventory, setUserInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemImage, setItemImage] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const { id } = useParams();
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
        inStock: item.quantity,
        image: item.imageLink,
        price: item.price
      })));
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  const editItem = async (itemId) => {
    try {
      const response = await fetch(`${apiURL}edititem/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_name: itemName,
          description: itemDescription,
          quantity: itemQuantity,
          imageLink: itemImage,
          price: itemPrice
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Edit successful:', result);
        fetchUserInventory();
        setEditingItem(null);
      } else {
        const errorData = await response.json();
        console.error('Edit failed:', errorData);

      }
    } catch (err) {
      console.error('Error editing item:', err);

    }
  };

  const deleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${apiURL}deleteitem/${itemId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log(await response.json());
          fetchUserInventory();
        } else {
          console.error('Delete failed:', await response.json());
        }
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  const startEditingItem = (item) => {
    setEditingItem(item.id);
    setItemName(item.name);
    setItemDescription(item.description);
    setItemQuantity(item.inStock);
    setItemImage(item.image);
    setItemPrice(item.price);
  };

  const miniDescription = (text) => {
    if(text.length <= 100){
      return text;
    } else {
      return text.substr(0, 100) + '\u2026';
    }
  };

  useEffect(() => {
    fetchUserInventory();
  }, []);

  return (
    <>
      <h1>{username}'s Inventory</h1>
      <p>To edit or delete individual items click on them</p>
      <Link to='/NewItem'><Button className="button" label='Add Item to your Inventory' /></Link>
      <div className="inventory-grid">
      {userInventory.map((item) => (
        <Card className="card" key={item.id}>
          {editingItem === item.id ? (
            <>
              <InputText value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />
              <InputText value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="Price" />
              <InputText value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Description" />
              <InputNumber value={itemQuantity} onValueChange={(e) => setItemQuantity(e.value)} placeholder="Quantity" />
              <InputText value={itemImage} onChange={(e) => setItemImage(e.target.value)} placeholder="Image URL" />
              <Button className="button" severity="success" onClick={() => editItem(item.id)} label='Save' />
              <Button className="button" severity="warning" onClick={() => setEditingItem(null)} label='Cancel' />
            </>
          ) : (
            <>
              <img className='image' src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{miniDescription(item.description)}</p>
              <p>Number left in stock: {item.inStock}</p>
              <Button className="button" onClick={() => startEditingItem(item)} label='Edit' />
              <Button className="button" severity="danger" onClick={() => deleteItem(item.id)} label='Delete' />
            </>
          )}
        </Card>
      ))}
      </div>
    </>
  );
};