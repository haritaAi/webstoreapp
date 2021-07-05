import React from 'react';

import {isAuthenticated} from '../auth/helper/index';


const StripeCheckout = () => {


    const token =  isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;


   
  
    return ( <div className = "display-3 text-center">
           stripe checkout
    </div>
     );
}
 
export default StripeCheckout;