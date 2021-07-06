import React, {useEffect, useState} from 'react';
import Base from './Base';
import Card from './card';
import { addItemToCart } from './helper/cartHelper';
import {getAllProducts} from './helper/coreapicalls';



export default function Home() {
    
    
    const [products,setProducts] = useState([]);
    const [error,setError] = useState(false);  
     const [order,setOrder] = useState([]);
     const [cartCount,setCartCount] = useState(0);
    const [cart,setCart] =  useState([]);
    const [inCartAlert,setAlert] = useState(false);
   

 const handleAddItemToCart = async (product) => {
   
     let cartRecieved = [];
     if(typeof window !== undefined)
        if(localStorage.getItem("cart")) 
            cartRecieved = JSON.parse(localStorage.getItem("cart"));  
     
    let  isIncluded = cartRecieved.find( c => c._id === product._id); 
     if( !isIncluded)
     {  
         addItemToCart(product,() =>  setCart(JSON.parse(localStorage.getItem("cart"))) );         
         setCartCount(cartCount+1);        
        }
        else {
            console.log("setting alert");
            setAlert(true); 
            setTimeout( () => {setAlert(false)},1000);         
        }    
      
  };
const loadProducts = async () => {

    await    getAllProducts()
                .then(data => {
                    if(data)
                    {  if(data.error){
                        setError(data.error);
                             }
                    else {
                        setProducts(data);
                        
                             }
                }
                });
    
                
 };

 const renderProductCards = () => {
 
         
      
    return(
        <div className = " d-flex flex-row  row">
        { (products.length > 0) && (products.map(product => 
                                    (<Card key = {product._id} 
                                        product = {product}                                                                           
                                        onSelect={handleAddItemToCart}
                                                    />)))}
    
    </div>
    );

 };

 const loadCart = () => {
    let cartRecieved = [];
    if(typeof window !== undefined){
             if(localStorage.getItem("cart")) {  
                 cartRecieved = JSON.parse(localStorage.getItem("cart"));    
                 setCart(cartRecieved);
                 setCartCount(cartRecieved.length);
               }
     }
 }
       
useEffect(() => {

  loadProducts();     
 
   loadCart();
  
},[]);
 
 
    return (
        <Base title = "Home Page" description = "your onestop shop!" 
              className = "container  m-auto" cartCount = {cartCount} inCartAlert = {inCartAlert}>
          {renderProductCards()}
                   
                
          
            
        </Base>
    );
}