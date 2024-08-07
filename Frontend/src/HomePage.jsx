import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card';
const apiURL = 'http://localhost:5080/'



export const HomePage = () => {
  const [fullInventory, setFullInventory] = useState([]);


  const fetchAllItems = async () => {
    try {
      const response = await fetch(`${apiURL}items/`);
      const data = await response.json();
      setFullInventory(data.map(item => ({
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

  useEffect(() => {
    fetchAllItems();
  }, []);


  return (
    <>
      <h1>Home</h1>
      <div>
        {fullInventory.map((item) => (
          <Link key={item.id} to={`/ItemDetails/${item.id}`}>
            <Card >
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>number left in stock: {item.inStock}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}