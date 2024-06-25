import Home from '@/pages/Home';
import { Login } from '@/pages/Login';
import Signup from '@/pages/Register';
import Index from '@/pages/layout/admin/Index';
import Header from '@/pages/layout/user/Header';
import Shop from '@/pages/user/Shop';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../pages/admin/ProductList'
import Cart from '@/pages/user/Cart';
import Order from '@/pages/user/Order';
export const WebRouters: React.FC = () => {
    return (
        <Routes>

            <Route element={<Header />} >
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin/login/" element={<Login />} />

            <Route path='/admin' element={<Index />}>
                <Route path="/admin/products/" element={< ProductList />} />
            </Route>
        </Routes >
    )
}