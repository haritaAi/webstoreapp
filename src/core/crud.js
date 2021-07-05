import React,{Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated} from '../auth/helper';


const currentTab = (history, path) => {

    if(history.location.pathname === path) return {color: "#2ecc72"};
    else return {color:"#FFFFFF"};

};

const AdminMenu = ({history,
                    pathname = "admin-selection" ,onCreate,onUpdate,onDelete,onRefresh}) => {
     
      

      return    <div className=" d-flex flex-column justofy-content-end">
                    {(isAuthenticated() && (isAuthenticated().user.role === 1) && (<Fragment> 
                       <button style = {currentTab(history,{pathname})} className ="btn btn-circle bg-success  m-2 btn-md rounded-3 " onClick = {onCreate} >Create New</button> 
                       <button style = {currentTab(history,{pathname})} className ="btn btn-circle bg-success m-2 btn-md " onClick = {onUpdate} >Update</button> 
                       <button style = {currentTab(history,{pathname})} className ="btn btn-circle bg-success m-2 btn-md " onClick = {onDelete} >Delete</button>           
                       <button style = {currentTab(history,{pathname})} className ="btn btn-circle bg-success m-2 btn-md " onClick = {onRefresh} >Refresh</button>           
                       
                       <Link style = {currentTab(history,{pathname})} className ="btn btn-circle bg-success m-2 btn-md" to = "/admin/dashboard">Admin Dashboard</Link> 
              
                    </Fragment>))}
                </div>


        };

export default withRouter(AdminMenu);