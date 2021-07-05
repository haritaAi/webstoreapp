export const addItemToCart =  (product,next) => {
   
    let cart = [];
    if(typeof window !== undefined){
       if(localStorage.getItem("cart")) 
           cart = JSON.parse(localStorage.getItem("cart"));  
            
        cart.push({...product});   
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
       }
      
       
     
 };
 export const removeFromCart = async (product) => {
       let cart = [];
       if(typeof window !== undefined){
            if(localStorage.getItem("cart")) 
                     cart = JSON.parse(localStorage.getItem("cart"));
           
            if(cart.length > 0)    
                {  
                    const index =  cart.findIndex(c =>  c._id === product._id);
                    cart.splice(index,1);        
                    await  localStorage.setItem("cart",JSON.stringify(cart));
                    
                   
                }
            }
 };

 export const updateQuantity =  (product,quantity) => {
   
    // console.log("product before adding",product);
    // console.log("Quantity received",quantity);
    let cart = [];
    if(typeof window !== undefined)
         if(localStorage.getItem("cart")) {
                  cart = JSON.parse(localStorage.getItem("cart"));
     
      const index =  cart.findIndex(c =>  c._id === product._id);
      
      cart[index].quantity = quantity;    
     
      localStorage.setItem("cart",JSON.stringify(cart));
         }  
 
 }

 export const loadCart = () => {
    if(typeof window !== undefined)
    if(localStorage.getItem("cart")) 
           return   JSON.parse(localStorage.getItem("cart"));
       
 }

export const cartEmpty = () => {
    let cart = [];
    if(typeof window !== undefined)
         localStorage.setItem("cart",JSON.stringify(cart)); 
        return;
}

export const createOrderSummery = () => {

    let orderTable = [];
    let cart = [];
    cart = loadCart();
    let key = 0;
    for(let item of cart){
      let x = item.quantity*item.price;
      orderTable[key] = {_id : item._id,
                         name :     item.name,
                         price :    item.price,
                         quantity : item.quantity,
                         total :   x  }
                         key++;
    }
    
   return orderTable;
 
}

export const calculateBillAmount = order => {
    let billAmount = 0;
    
    for(let amount of order){ billAmount = billAmount + amount["total"];}
  
    return billAmount;
}