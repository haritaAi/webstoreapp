import React, { useState,useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { removeFromCart,updateQuantity,createOrderSummery,calculateBillAmount } from '../core/helper/cartHelper';
import ImageHelper from '../core/helper/ImageHelper';




const Cart = () => {

  const [cart,setCart] = useState([]);
   


  const removeProduct = product => {    
      
        setCart(removeFromCart(product));      
          loadCart();
  };

  const handleIncreaseQuantity = product => {
   
    if(product.quantity < 5)
    {        
        
         product.quantity += 1;                
          updateQuantity(product,product.quantity);
         loadCart();
    }
}

const handleReduceQuantity = product => {
  if(product.quantity >1)
  {
      product.quantity -=1;     
          updateQuantity(product,product.quantity);
         loadCart();
  }
}

const loadCart = async () => {
  let cartRecieved = [];
  if(typeof window !== undefined){
           if(localStorage.getItem("cart")) {  
               cartRecieved = JSON.parse(localStorage.getItem("cart"));    
               await setCart(cartRecieved);
              
             }
   }
}

  useEffect(() => {

      loadCart();   
  },[]);

   const productInCart = () => {
    
     return  (
     
      <ul className = "list-group">
       {cart.map(product =>    
        <li   key = {product._id +  Math.random()*100}    className = "  rounded  list-group-item text-dark text-right m-2" >                                                                              
      
           <div className = "float-left" style = {{maxWidth : "150px"  , maxHeight : "150px"}}> 
           <ImageHelper product = {product} /></div>                                         
           <div className = "ml-5 float-right">
                   <ul className ="list-unstyled">
                   <li>{product.name}</li>
                   <li>{product.photo}</li>
                   <li>{product.description}</li>
                   <li>quantity :
                               <span className = "btn  border mr-2" 
                                       onClick = {()=> handleReduceQuantity(product)}> -</span> 
                               {product.quantity}
                               <span className = "btn  border ml-2" 
                                       onClick = {() =>handleIncreaseQuantity(product)}>+ </span>
                       </li>
                   <li>price : {product.price}</li>
                   
                   <li className ="float-right btn btn-sm border border-danger text-dark" 
                                   onClick = {() =>removeProduct(product)}><i class="fa fa-trash-o " aria-hidden="true"></i></li>
                   </ul>                     
               </div>
          
        </li>)}
        </ul>
 )

   };

   
const orderSummery = () => {
  

  const  orderTable =createOrderSummery();
 
  let billAmount = calculateBillAmount(orderTable);

      if(orderTable.length > 0)
              return (
                <table className = "table table-striped border">
                  <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">total</th>
                        </tr>
                    </thead>
                    <tbody>
                  {
                    cart.map((product,index) => <tr>
                                          <th scope="row">{index+1}</th>
                                          <td>{product.name}</td>
                                          <td>{product.quantity}</td>
                                          <td>{product.price * product.quantity}</td>
                                        </tr>
                                                  
                                        )
                  }
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className = "font-weight-bold">${billAmount}</td>

                  </tr>
                  </tbody>
                </table>
    );
    else return (<div>
           <span><h2 className = "lead" >Oops!! Your cart is Empty. <Link to = "/">Go Shopping!!!</Link></h2></span>
    </div>)


}





    return (
        <Base title = "Cart" description = "your onestop shop!" className = "container  m-auto">
      <div className="row bg-white rounded">
               <div className = "col" >
                  {productInCart()}
                       
               </div>
               <div className="col font-weight-bold m-3 ">
                  Order Summary
                <div className="font-weight-normal">
                  {orderSummery()}
                </div>
                <div>
                <div className = "flot-left d-inline rounded">
            {(cart.length > 0 ) && (<Link className=" btn btn-success text-center text-white " 
                                         to = {isAuthenticated()?"/checkout":"/signin"}>
                                               confirm and checkout</Link>) }
        </div>
        <div className = "float-right rounded">
            <Link className = "btn btn-success text-center text-white float-right" to = "/">continue shopping</Link> 

        </div>
                </div>
               </div>
      </div>
        
                   
          
            
        </Base>
      );
}
 
export default Cart;