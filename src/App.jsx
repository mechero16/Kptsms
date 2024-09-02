import { useState } from 'react'
import './App.css'
import Nav from './Nav'
import Excel from './Excel'
import Smsbar from './Smsbar'

function App() {

  return (
    <>
    <Nav></Nav>
    <Excel sheetName = "fullstack" src="https://docs.google.com/spreadsheets/d/1BbATnPvoXQFqbwDwFxQ9-vb-VCypl3Jund8-sBXjz2U/edit?usp=sharing" />
    
    </>
  )
}

export default App
