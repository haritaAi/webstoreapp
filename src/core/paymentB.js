import React ,{useState,useEffect} from 'react'
import { loadCart,cartEmpty } from './helper/cartHelper';
import {Link} from 'react-router-dom';
import {getNewToken,processPayment} from './helper/paymentBrainTreeHelper';
import {createOrder} from "./helper/orderhelper";
import {isAuthenticated} from "../auth/helper";
import DropIn from 'braintree-web-drop-in-react'

const PaymentB = ({products,billAmount,setReload}) => {
  
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
   const cart =loadCart();
    
    const [info,setInfo] = useState({
        loading : false,
        success : false,
        clientToken : null,
        error : "",
        instance : {}
    });
   

    const getToken =  (userId,token) => {
        getNewToken(userId,token).then(info => {
                        //  console.log("Client Info : ",info);
         
                    if(info.error) setInfo({...info,   error : info.error });
                    else   {  
                            const clientToken  =  info.clientToken;       
                            setInfo({clientToken}); 
                            return;
                           
                    }
                    
      });
    };

 useEffect(() => {
   
     getToken(userId,token);
    //  console.log("Inside useEffect :",info);

    
 },[]);



const onPurchase =  () => {
    // setInfo({loading : true });
    let nonce;
    let getNonce =   info.instance
                               .requestPaymentMethod()
                               .then(data => { 
                                                  nonce = data.nonce;
                                                  const paymentData  = {
                                                          paymentMethodNonce : nonce,
                                                          amount : billAmount
                                                  };
                                                  processPayment(userId,token,paymentData).then(response => {
                                                                                            console.log("Payment success");
                                                                                            setInfo({...info,loading : false, success : response.success});
                                                                                                const orderData = {
                                                                                                       products:products,
                                                                                                       transaction_id : response.transaction.id,
                                                                                                       amount : response.transaction.amount
                                                                                                   };
                                                                                                   createOrder(userId,token,orderData)
                                                                                                          .then(console.log("order saved in DB"))
                                                                                                          .catch(err => console.log(err));                                                                                                       
                                                                                                  
                                                                                                   cartEmpty();
                                                                                                   setReload();  
                                                                                        }).catch(error => {
                                                                                            console.log("Payment failed",error);
                                                                                            setInfo({loading : false , success : false});
                                                                                                                    });


                                                                                       }).catch();
     
    // processPayment(userId,token, paymentData);

};
    const showBTDropIn = () => {
        return (
            info.clientToken && cart.length>0 &&  (<div>
                <p>Amount payable ${billAmount}</p>
                <div className = "dropin-container">
                      <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={instance => (info.instance = instance)}
                            />
                         {cart.length>0 &&   <button className = "btn btn-primary rounded "
                                    onClick={onPurchase}>Buy Now
                                </button>}
                            {cart.length === 0 && <p className = "lead">Thank you for shopping !</p>}
                            </div>
       
                  </div>  )
        );
    }


    return (
        <div>
            {showBTDropIn()}
        </div>
    );
}
 
export default PaymentB;