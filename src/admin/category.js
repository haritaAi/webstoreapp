import React, {  useEffect, useState } from 'react';
import AdminMenu from '../core/crud';
import { isAuthenticated } from '../auth/helper';
import {createCategory,deleteCategory,getCategory, updateCategory} from './helper/adminapicall';




const CategoryDashboard = () => {

    const [name,setName]   = useState("");
    const [categoryId,setId] = useState("");
    const [error,setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user,token}  = isAuthenticated();

     const [categories, setCategories] =  useState([]);  


     
   const populateCategories =  async () => {     
          setError("");
          setSuccess(false);          
           const categoryList = await  getCategory(user._id,token);         
          setCategories(categoryList);                                    

   } ;


   const onCategorySelect = input => {    
     let category = categories.find(c => c.name === input );
      setId(category._id);
      setName(category.name);
   };

  const renderCategories = () => {
    
       if (categories.length > 0)
               return  (   <ul className = "list-group">
                                { categories.map(category => 
                                              (<li className = "list-group-item text-dark "
                                                   key = {category._id}
                                                   onClick ={() => onCategorySelect(category.name)}>{category.name}</li>)
                                   )}</ul>  )    ;    
     };


    
       useEffect(() => {             
             
              populateCategories();

        },[]);
   
    const handleChange = event => {
        
           setError("");
           setName(event.target.value)
          };
    
    
    
     const handleCreate = event => {
            
            event.preventDefault();
            setError("");
            setSuccess(false);
         
            //backend request
            createCategory(user._id,token,{name})
                    .then(data => {
                                    if(data.error){
                                      setError(true);
                                      setName("");
                                    }
                                    else {
                                      setError("");
                                      setSuccess(true);
                                      setName("");

                                      populateCategories();
                                      renderCategories();
                                    }
                            });
      };

      const handleUpdate  = async (event) => {

          event.preventDefault();
          setError("");
          setSuccess(false);
          console.log("category ID :::",categoryId);
          console.log("user ID :::",user._id);
     await  updateCategory(categoryId,user._id,token,{name})
                    .then(data => {   
                               console.log(data);                 
                                setError("");
                                setSuccess(true);
                                setName("");
                                setId(""); 
                                populateCategories();
                                renderCategories();
                        })
                      .catch(err => console.log(err));
              
      };
    
     const handleDelete = event => {
       
      event.preventDefault();
      setError("");
      setSuccess(false);
      deleteCategory(categoryId,user._id,token)
                    .then(data => {                    
                      if(data.error){
                        setError(true);
                        setName("");
                    }
                  else {
                        setError("");
                        setSuccess(true);
                        setName("");
                        setId("");

                        populateCategories();
                        renderCategories();
                  }
              });
     }

    const successMessage = () => {
      if(success) return <h4 className = "text-success ">Category created successfully</h4>
    };

    const warningMessage =() => {
      if(error) return <h4 className = "text-warning ">Category creation failed</h4>

    }

    const categoryForm = () => {      

         
        return (   
          <form className = "my-5">
           
          <div className = "row ">                 
                <div className =  " col-md-5  bg-white    py-3">  
                              <div className = "lead text-center  text-dark ">Category list</div>
                               {renderCategories()}
                </div>

                 <div className = "col-md-7">  
                          <form action="">
                          <h3 className = " text-light my-3">Category Form</h3>         
                                  <label className="col col-form-label text-light ">id</label>
                                  
                                      <div className="col "> 
                                                  <input  readOnly value = {categoryId} className = "form-control" type="text"/>
                                      </div>
                                              
                            
                                      <label className=" col col-form-label text-light">category name</label>
                                      <div className="col"> 
                                          <input  className = "form-control" 
                                                  autoFocus 
                                                  onChange = {handleChange}
                                                  placeholder = "For ex. summer collection" 
                                                  value = {name}
                                                  type="text"/>
                                      </div>                              
                               
                            </form>            
                  </div> 
          </div> 
          </form>
      );
      };

   
      
     


    return ( 
        <div>  
          
              
             {successMessage()}
             {warningMessage()}   
               <div className="container-fluid">
                <div className="row width-auto">
                    <div className="col-md-10">
                         {categoryForm()}                           
                      </div>
                      <div className="col-md-2 ">
                      <div className = " my-5  "> <AdminMenu pathname = "category" onCreate = {handleCreate} onUpdate = {handleUpdate} onDelete = {handleDelete}/>  </div>    
                        </div>
                </div>
                
                 </div>     
                               
                   
            
        </div>
     );
}
 
export default CategoryDashboard;