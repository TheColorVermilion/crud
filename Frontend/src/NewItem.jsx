import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react'

const apiURL = 'http://localhost:5080/'
//https://crud-backend-0aoh.onrender.com/

export const NewItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [message, setMessage] = useState('')
  const [itemImage, setItemImage] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const user_id = Number(localStorage.getItem('userId'));

  const postItem = async () => {
    try {


      const response = await fetch(`${apiURL}newitem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          item_name: itemName,
          description: itemDescription,
          quantity: Number(itemQuantity),
          imageLink: itemImage,
          price: itemPrice

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
      <h1>Add An Item To Your Inventory</h1>
      <Card>
        <InputText placeholder="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <InputText placeholder="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
        <InputText placeholder="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
        <InputText keyfilter="int" placeholder="Quantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
        <InputText placeholder="Link to Image of Item" value={itemImage} onChange={(e) => setItemImage(e.target.value)} />
        <Link to={`/UserInventory/${user_id}`}><Button label='Submit' onClick={postItem} /></Link>
      </Card>
    </>
  )
}
// currently when you create a new item and it instatly links you to the user inventory page the new item isnt shown
// not 100% how to fix but if i have time i will try, it does show up if you hit home and then back to the inventory