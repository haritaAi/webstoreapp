import React, { useState }  from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { calculateBillAmount, createOrderSummery, loadCart } from '../core/helper/cartHelper';
import StripeCheckOutButton from 'react-stripe-checkout';
import {API} from './../backend';
import { isAuthenticated } from '../auth/helper';
import PaymentB from '../core/paymentB';
 
const CheckOut = () => {

    const [load,setReload] = useState(false);

    let orderTable=[];
    let billAmount = 0;
    let  cart = [];
    const token = isAuthenticated() && isAuthenticated().token;
    
    const userId = isAuthenticated() && isAuthenticated().user._id;
   
       
  
    cart =loadCart();      
          orderTable = createOrderSummery();
          billAmount = calculateBillAmount(orderTable);
         const  amount = billAmount * 100;


    const makePayment = token => {
                      
                        const body = {
                        token,
                        orderTable,
                        amount 
                        }
                        const headers = {
                        "Content-Type" : "application/json"
                        }
                       
                        return fetch(`${API}stripepayment`,{
                                        method : "POST",
                                        headers,
                                        body: JSON.stringify(body)
                                      }).then( response =>{
                                      console.log("RESPONSE in front end " ,response);
                                     
                                     //create order  and clear cart
                                      }).catch(error => console.log("This is front end error: ",error) );
          };

const orderSummery = () => {
    
         return <table className = "table table-striped border m-auto">
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
            cart.map((product,index) => <tr >
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
       
  
  }
  const onSetReload = () => {
    (!load)? setReload(true): setReload(false);
  }

          

    return (  <Base title = "order" 
                    description = ""
                    className = "container  m-auto" cartCount = {cart.length} >
                       {cart.length > 0 && <div className = "row text-white mt-5 ">
                                <div className="col bg-white rounded ">
                                {orderSummery()}   
                              
                                </div>
                              <div className="col rounded  bg-white text-center ">
                              
                                <br/>
                              <StripeCheckOutButton
                                
                                stripeKey = {"pk_test_51Inl6ySJjOncLGai6UVCe9urltfOeZSObhbaPSQlNbSkRYRNRwSfNcXkmVphq2mXr59XtjbjXClxMAL7EzeulYVY00WtOdzL3d"}
                                token = {makePayment}
                                name = "Product Store purchase"
                                amount ={billAmount*100}
                                shippingAddress
                                billingAddress >
                                  

                                </StripeCheckOutButton > 
                                <div className = "m-2 text-dark "> 

                                <PaymentB products = {orderTable} 
                                          billAmount = {billAmount}
                                          setReload = {onSetReload}/>
                                </div>
                              </div>
                        
                        </div>}
                        {cart.length === 0 && <div>
                                                    <p className = "text-white font-weight-bold">Thank you for shopping!!</p>
                                                    <Link className = "btn btn-success rounded" to = "/">Home</Link>
                                              </div>}
             </Base>
    );
}
 
export default CheckOut;