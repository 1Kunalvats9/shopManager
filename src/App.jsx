import './index.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from "./components/Dashboard"
import AddProducts from './components/AddProducts'
import SellProducts from './components/SellProducts'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/sell-products" element={<SellProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
