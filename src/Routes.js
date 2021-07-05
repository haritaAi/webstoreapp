import React  from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import CategoryDashboard from './admin/category';
import ProductDashboard from './admin/product';
import OrderDashboard from './admin/Orders';
import Cart from './user/Cart';
import CheckOut from './user/checkout';

 const  Routes = () => {

    return (
        <BrowserRouter>
        <Switch>
             <Route path = '/' exact component = {Home}/>
             <Route path = '/cart' exact component = {Cart}/>
             <Route path = '/signup' exact component = {Signup}/>
             <Route path = '/signin' exact component = {Signin}/>
             <PrivateRoute path = '/checkout' exact component = {CheckOut}/>
             
             <PrivateRoute path = "/user/dashboard" exact component = {UserDashBoard}/>
             <AdminRoute path = "/admin/dashboard" exact component = {AdminDashBoard}/>
             <AdminRoute path = "/admin/category" exact component = {CategoryDashboard}/>
             <AdminRoute path = "/admin/product" exact component = {ProductDashboard}/>
             <AdminRoute path = "/admin/order" exact component = {OrderDashboard}/>
          
             {/* <AdminRoute path = "/admin/create/product" exact component = {AddProduct}/> */}
        </Switch>



        </BrowserRouter>
    );
}

export default Routes;