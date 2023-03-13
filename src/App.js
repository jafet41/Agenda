import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import OffsetPage from './components/OffsetPage'

export const DateContext = React.createContext()

function App() {

  const [fecha,setFecha] = useState(new Date())
  const [offset,setOffset] = useState(0)
  const [fechaOffset,setFechaOffset] = useState(new Date())

  return (
    <DateContext.Provider 
     value={{ fecha: [fecha,setFecha], offset: [offset,setOffset], fechaOffset: [fechaOffset,setFechaOffset] }}>
      <Navbar />
      <OffsetPage />
    </DateContext.Provider>
  );
}

export default App;