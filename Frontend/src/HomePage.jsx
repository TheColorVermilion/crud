import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card';
import './homepage.css'
const apiURL = 'http://localhost:5080/'
//https://crud-backend-0aoh.onrender.com/



export const HomePage = () => {
  const [fullInventory, setFullInventory] = useState([]);

  const miniDescription = (text) => {
    if(text.length <= 100){
      return text
    }else{
      return text.substr(0, 100) + '\u2026'
    }

  }


  const fetchAllItems = async () => {
    try {
      const response = await fetch(`${apiURL}items/`);
      const data = await response.json();
      setFullInventory(data.map(item => ({
        id: item.item_id,
        seller: item.user_id,
        name: item.item_name,
        description: item.description,
        inStock: item.quantity,
        price: item.price,
        image: item.imageLink
      })))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAllItems();
  }, []);


  return (
    <>
      <h1>The CRUD Inventory</h1>
      <div className="inventory-grid">
        {fullInventory.map((item) => (
          <Link key={item.id} to={`/ItemDetails/${item.id}`}>
            <Card className="card">
              <img className='image'src={`${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{miniDescription(item.description)}</p>
              <p>number left in stock: {item.inStock}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}