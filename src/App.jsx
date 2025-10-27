import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Bmr from './pages/Bmr'
import Bmi from './pages/Bmi'
import Car from './pages/Car'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/bmr" element={<Bmr/>}/>
          <Route path="/bmi" element={<Bmi/>}/>
          <Route path="/car" element={<Car/>}/>      
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
