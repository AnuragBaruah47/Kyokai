import { useState } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import RootLayout from './Layout/RootLayout'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<RootLayout/>}/>
        <Route index element={<Home/>}/>
      </Route>
    )
  )

  return (
    <>
    </>
  )
}

export default App
