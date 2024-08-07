import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';

const apiURL = 'http://localhost:5080/'
export const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const { id } = useParams();


  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`${apiURL}items/${id}`);
      const data = await response.json();
      setItemDetails(data.map(item => ({
        id: item.id,
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
    fetchItemDetails();
  }, []);


  return (
    <>

      <div>
        {itemDetails.map((item) => (
          <Card key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>number left in stock: {item.inStock}</p>
            <p>sold by User ID: {item.seller}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
