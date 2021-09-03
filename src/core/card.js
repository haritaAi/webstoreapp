import React,{useState,useEffect} from 'react';
import {Redirect,Link} from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';





const Card = ({product,onSelect}) => {
       
    const [redirect,setRedirect] = useState(false);
    
    product.quantity = 1;  
    const getARedirect = (redirect) => {
        if(redirect)return <Redirect to = '/cart'/>
    }
     const showAddToCart = () => {
            
          return ( (<button   onClick = {()=> onSelect(product)}
          className = "btn btn-block btn-outline-info mt-2 mb-2">
           Add to Cart
          </button>) )
     } 
    //  const showRemoveFromCart = () => {
    //      return (removeFromCart && (<button onClick = {() => onRemove(product)}
    //      className = "btn btn-block btn-outline-danger mt-2 mb-2">
    //       Remove from Cart
    //      </button>))
    //  }
    
    return ( 
        <div className="col bg-transparent mx-auto my-4 " style = {{ maxWidth : "300px" , minWidth : "300px"  }}>
        <div className = " card text-white bg-transparent border border-info text-center">
                 <div className="card-header lead">{product.name}</div>
                
                  {getARedirect(redirect)}
                  <ImageHelper product = {product}/>
                 <p className="lead bg-info font-weight-normal text-wrap">
                    {product.description}
                 </p>
                 <p className="btn btn-info rounded btn-sm px-4">{product.price}</p>
                <div className="row">
                    <div className="col-12">
                       {showAddToCart() }
                    </div>
                  
                </div>
        </div>
        </div>
     );
}
 
export default Card;