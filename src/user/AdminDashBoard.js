import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper';
import { Link} from 'react-router-dom';



const AdminDashBoard = () => {    


    const {user:{name,email}} = isAuthenticated();      
    

     const adminLeftSide = () => {
 
           return (
               <div className = "card">
                    <h4 className="card-header ">Admin Navigation</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link  className = "nav-link text-info" to = "/admin/category"  >Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link  className = "nav-link text-info" to = "/admin/product">Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link  className = "nav-link text-info" to = "/admin/order">Order</Link>
                        </li>
                    </ul>
               </div>
           );        
     };
     
     const adminRightSide = () => {
            return (
                <div className = "card mb-4">
                    <h4 className="card-header">Admin info</h4>
                    <ul className="list-group">
                        <li className="list-group-item text-muted">
                            <span className="badge  mr-2">Name :  {name}</span>
                        </li>
                        <li className="list-group-item text-muted">
                            <span className="badge  mr-2">email:  {email}</span>
                        </li>
                    </ul>
                </div>
            );

     };
    return ( 
        <Base title = "AdminDashBoard Page"
                description = "Manage your products and services here"
                className ="container bg-success p-4">
                    <div className="row">
                        <div className="col-3">
                        {adminLeftSide() }
                        </div>
                        <div className="col-9">
                        {adminRightSide()}
                            </div>
                    </div>
          
           
        </Base>
     );
}
 
export default AdminDashBoard;