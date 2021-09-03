import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import Menu from './menu';



const Base = ({ title = "My Title",
                description = " My Description",
                className = "bg-dark text-white",
                cartCount,
                inCartAlert,
                children}) => {
  
    
   
    if(typeof window !== undefined)
        if(localStorage.getItem("cart"))
            cartCount = (JSON.parse(localStorage.getItem("cart"))).length;
               
            
    
    return ( 
            <div>
             <Menu cartCount = {cartCount} inCartAlert = {inCartAlert}/>
                <div className = "container-fluid">
                    <div  className ="jumbotron mt-5 bg-dark text-white text-center py-2">
                        <h2 className = "display-4 m-auto">{title}</h2>
                        <p className = "m-auto">{description}</p>
                                
                    </div>
                    <div className = {className}>{children}</div>
                    </div>
              
                <footer className = "footer bg-dark my-5">
                <div className  = "container-fluid bg-info text-white text-center py-3">
                    <h4>
                        If you have any questions, feel free to reach out
                    </h4>
                    <button className = "btn  btn-warning btn-lg rounded">Contact Us</button>
                </div>
                    <div className  = "container">
                        <span className = "text-muted">
                            An Amazing place to<span className ="text-white"> Go Shopping!!!</span>
                        </span>
                    </div>
                </footer>
                </div>
     );
}
 
export default Base;