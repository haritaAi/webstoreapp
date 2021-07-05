import React,{Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth/helper';
        

const currentTab = (history, path) => {
    
    if(history.location.pathname === path) return {color: "#2ecc72"};
    else return {color:"#FFFFFF"};

};


const Menu = ({history,cartCount,inCartAlert}) => {



 return  <div className ="d-block fixed-top" >
      <div className = "container-fluid">
          <div className = "row">
      <ul className = "col-md-11 nav nav-tabs bg-dark  ">
          <li className = " nav-item">
              <Link style = {currentTab(history,"/")} className="nav-link" to = "/">Home</Link>
          </li>        
          
          {!isAuthenticated() && (<Fragment>
            
          <li className = " nav-item">
              <Link style = {currentTab(history,"/signup")} className="nav-link" to = "/signup">Sign up</Link>
          </li>
          <li className = " nav-item">
              <Link style = {currentTab(history,"/signin")} className="nav-link" to = "/signin">Sign in</Link>
          </li>
          </Fragment>)}
          {isAuthenticated() && isAuthenticated().user.role ===1 && (<Fragment>
            <li className = " nav-item">
                 <Link style = {currentTab(history,"/admin/dashboard")} className="nav-link" to = "/admin/dashboard">AdminDashboard</Link>
            </li>
          </Fragment>)}
          {isAuthenticated()  && (<Fragment>             
            <li className = " nav-item">
                 <Link style = {currentTab(history,"/user/dashboard")} className="nav-link" to = "/user/dashboard">Dashboard</Link>
           </li>
       
            <li className = " nav-item">
              <span  onClick = {() => {signout(() => {
                                 history.push("/");
                                  }) 
                                  }} className="nav-link text-warning"  >Sign out</span>
          </li>
          </Fragment>)}
          
      </ul>
          <Link className = " col-md-1  float-right text-white" to = "/cart">
              <span className = "display-5" >{cartCount}</span >
                    <i className ="fa fa-shopping-cart fa-3x " aria-hidden="true"></i></Link>
         {inCartAlert && (<div className="alert alert-warning">
             Product already in your cart!
         </div>)}
        
         </div>
         </div>
  </div>

    };

export default withRouter(Menu);