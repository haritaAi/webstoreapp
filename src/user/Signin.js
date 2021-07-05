import React, { useState } from 'react';
import Base from '../core/Base';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthenticated} from '../auth/helper';


const Signin = () => {

    const [values,setValues] = useState({
       
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false
    });

    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();
    
    const handleChange = name => event =>  {
        setValues({...values, error : false, [name] : event.target.value});
    };
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values,
                error : false,
            loading : true  });
        signin({email,password})
              .then( data => {
                  if(data.error) setValues({ ...values,error : data.error, loading : false  });
                  else authenticate(data,() => {
                      console.log("Signed in successfully");
                      setValues({...values,didRedirect : true});
                  });
              })
              .catch(err => console.log(err));
    };
    const performRedirect = () => {
         if(didRedirect){
             console.log("ROLE ::" ,user.role);
             if(user && user.role === 1)return <Redirect to = "/admin/dashboard"/> ;
             else return <Redirect to = "/user/dashboard"/>;
         }
         if(isAuthenticated()) return <Redirect to = "/"/>;
    };
    const signInForm = () => {
      return (     
        <div className = "row">
           <div className = "col-md-6 offset-sm-3 ">  
           <form action="">
              
                <div className="form-group">
                    <label className="text-light">email</label>
                    <input onChange = {handleChange("email")} value = {email} className = "form-control" type="email"/>
                </div>
                <div className="form-group">
                   <label className="text-light">Password</label>
                   <input onChange = {handleChange("password")}value = {password} className = "form-control" type="password"/>
                </div>
                 
                <button  onClick = {onSubmit} className="btn-success btn-block">Submit</button>
    
             </form>            
           </div> 
        </div> 
    );
    };
    const errorMessage = () => {
        return  <div className = "row">
                  <div className = "col-md-6 offset-sm-3 text-left">  
                        <div className="alert alert-danger"
                            style = {{display : error ? "":"none"}}>{error}
                            </div>
                    </div>
     </div>
    }     
  
    const loadingMessage = () => {
        return  (
            loading && (<div className = "alert alert-info"><h2>Loading...</h2>

            </div>)
        ); 
    } 

    return ( 
        <Base title = "Sign in page">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}   
            {performRedirect()}  
            <p className = "text-center m-3">Not registered yet! <Link to = "/signup">Sign Up</Link> now!! </p>
          
            {/* <p className = "text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
     );
}
 
export default Signin;
