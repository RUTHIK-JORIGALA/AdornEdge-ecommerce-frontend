
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import Products from './pages/admin-view/Products'
import Orders from './pages/admin-view/Orders'
import Features from './pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/NotFound'
import Account from './pages/shopping-view/Account'
import Checkout from './pages/shopping-view/Checkout'
import Listing from './pages/shopping-view/Listing'
import Home from './pages/shopping-view/Home'

function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
     <Routes>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='features' element={<Features/>}/>
      </Route>

      <Route path='/shop' element={<ShoppingLayout/>}>
        <Route path='home' element={<Home/>} />
        <Route path='listing' element={<Listing/>} />
        <Route path='checkout' element={<Checkout/>} />
        <Route path='account' element={<Account/>} />
      </Route>
      <Route path="*" element={<NotFound/>} ></Route>
     </Routes>
    </div>
  )
}

export default App
