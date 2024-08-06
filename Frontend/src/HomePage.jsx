import React, { useState, useEffect } from 'react'
const apiURL = 'http://localhost:5080/'


export const HomePage = () => {
  try {
    const response = await fetch(`${apiURL}login/`, {
    })
  }catch(err)
  return(
    <>
    <h1>Home</h1>
    </>
  )
}