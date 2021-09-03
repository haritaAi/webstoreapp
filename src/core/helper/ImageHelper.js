import React from 'react';
import {API} from '../../backend';

const ImageHelper = ({product}) => {

    const imageurl = product? `${API}/products/photo/${product._id}`
    : `https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;

  
    return ( 
           <div className="rounded border border-success p-2">
               <img src={imageurl} 
                    alt="product picture"
                    style ={{maxHeight : "100%" , maxWidth : "100%"}} 
                    className="mb-3 rounded"/> 
           </div>
     );
}
 
export default ImageHelper;
