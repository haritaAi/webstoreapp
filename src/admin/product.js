import React,{ useEffect,useState}  from 'react';
import { isAuthenticated } from '../auth/helper';
import AdminMenu from '../core/crud';
import ImageHelper from '../core/helper/ImageHelper';
import { createProduct, deleteProduct, getAllProducts,getCategory,updateProduct} from './helper/adminapicall';


const ProductDashboard = () => {

    const[values,setValues] = useState({
        _id : "",
        name:"",
        description : "",
        price :"",
        stock :"",
        photo : "",
        category :"",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect: false,
         formData : "",
        success : false
    });
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([{ _id: "",name : ""  }]);

   const{_id , name , description , price , stock , category , formData ,
          error , createdProduct } = values;
     

    const {user,token}  = isAuthenticated();
    

    const onProductSelect = productId => {
     
      const  selectedProduct = products.find(p => p._id === productId);
     console.log("selected Product::", selectedProduct);

      setValues({...values, _id : selectedProduct._id,
                            name:selectedProduct.name,
                            description : selectedProduct.description,
                            price :selectedProduct.price,
                            stock :selectedProduct.stock,
                            photo : selectedProduct.photo,
                            category : selectedProduct.category._id });
        
                           
            
    };
   const handleRefresh = event => {
    event.preventDefault();
    setValues({
                  _id : "",
                  name:"",
                  description : "",
                  price :"",
                  stock :"",
                  photo : "",
                  category : "",
                  loading : false,
                  error : "",
                  createdProduct : "",
                  getRedirect: false,
                  formData:"",
                  success : false
                });
      
   };
const populateCategories = async () => {

        const categoryList = await  getCategory();  
       
          setCategories(categoryList);
         
     };
     const findCategoryName = input => {       
      let cat =  categories.find(c => c._id === input );   
      return cat.name;
     };
const populateProducts = async () => {
              
         const productList = await  getAllProducts();  
      
         setProducts(productList);    
       
         populateCategories();
         
    };
   
  const renderProducts = () => {

   console.log("Products arre:", products);
    
      return  ( 
       <div> 
        <ul className = "list-group">
         {(products.length >0 ) && products.map(product => 
                (<li   key = {product._id} 
                      className = "d-flex flex-row  btn btn-primary rounded  list-group-item text-dark text-right"
                      onClick ={() => onProductSelect(product._id)}>                  
                                                                                     
                              <div  style = {{maxWidth : "150px"  , maxHeight : "100px"}}> 
                                   <ImageHelper product = {product} />
                               </div>                                         
                            <div className = "justify-content-right">
                                <ul className ="list-unstyled">
                                    <li  key = {product._id+(Math.random()*10)}>{product.name}</li>
                                    <li  key = {product._id+(Math.random()*6)}>{product.description}</li>
                                    <li  key = {product._id+(Math.random()*7)}>stock : {product.stock}  price : {product.price}</li>
                                    <li  key = {product._id+(Math.random()*5)}>category : {product.category.name}</li>
                                </ul>
                                
                            </div>
                                        
                  </li>)
              )}
        </ul>
        </div> 
           ) ; 
      
   
  };
  

  useEffect(() => {        
    populateProducts();
    setValues({...values,formData : new FormData()});

    
},[]);


  const handleChange = name => event => {
    
       const value = name === "photo" ? event.target.files[0] : event.target.value ;       
       formData.set(name,value);
       setValues({...values,[name]:value});
      
   };




   const handleCreate = (event) => {
          
          event.preventDefault();
          
          setValues({...values,error : "", loading : true});          
          createProduct(user._id, token ,formData)
                          .then(data => {
                              if(data.error){
                                    setValues({...values,error : data.error});                                    
                              }
                              else{
                                  setValues({...values, _id : "",
                                                        name : "",
                                                        description : "",
                                                        price : "", 
                                                        photo :"",
                                                        stock : "",
                                                        loading : false,
                                                        category : "",
                                                        createdProduct : data.name  ,
                                                        success : true          
                                          });
                                          populateProducts();
                                          renderProducts();
                                         
                                  }
                        });
           
   
   };


   const handleUpdate = (event) => {
     

      event.preventDefault();
          setValues({...values,error : "", loading : true});   
          console.log("Category selected :",findCategoryName(category) );

        updateProduct(_id,user._id,token,formData)
                          .then(data => {
                              if(data.error){
                                  setValues({...values,error : data.error});                                  
                              }
                              else{
                                  setValues({...values, _id : "",
                                                        name : "",
                                                        description : "",
                                                        price : "", 
                                                        photo :"",
                                                        stock : "",
                                                        loading : false,
                                                        category : "",
                                                        createdProduct : data.name  ,
                                                        success : true          
                                          });
                                          populateProducts();
                                          renderProducts();
                                         
                                  }
                        })
    
    };
 const handleDelete = (event) => {
    
    deleteProduct(_id,user._id,token)
                   .then(data =>{
                       if(data.error) {
                          setValues({...values,error : data.error});
                       }
                       else {
                         populateProducts();
                         renderProducts();
                          handleRefresh(event);
                       }
                     }).catch(err => console.log(err));
   
 };

    const productForm = () => {
        return (   
           <form>
              
          <div className = "row">
              <div className = "col-md-4  bg-dark    py-3">  
                 <div className = "lead text-center  text-white">Product list</div>
                  {renderProducts()}
                </div>
                
             <div className = "col-md-6 offset-md-4 fixed-side">  
             <form >
                 <h3 className = " text-light my-3">Product Form</h3>
                          <div className="form-group">
                          <label className="text-light">Product id</label>
                          <input readOnly 
                                  value={_id} 
                                  className = "form-control" 
                                  type="text"/>
                        </div>
                   
                        <div className="form-group">
                            <label className="text-light">Product name</label>
                            <input  value ={name} 
                                    onChange = {handleChange("name")} 
                                    placeholder="Name"
                                    className = "form-control" 
                                    type="text"/>
                        </div>   
                      
                        <div className="form-group">
                            <label className="text-light">Product Description</label>
                            <input  value ={description}
                                    onChange = {handleChange("description")} 
                                    className = "form-control" 
                                    placeholder="Description"
                                    type="text"/>
                        </div>   

                        <div className="row">                       
                            <div className="col-md-4">

                                <div className="form-group">
                                <label className="text-light">price</label>
                                <input value ={price} 
                                      onChange = {handleChange("price")}
                                      placeholder="Price"
                                      className = "form-control" 
                                      type="text"/>            
                                </div>  
                            </div>   
                         <div className="col-md-4">

                            <div className="form-group">
                            <label className="text-light">stock</label>
                            <input value ={parseInt(stock)} 
                                   onChange = {handleChange("stock")}
                                   placeholder = "stock"
                                   className = "form-control" 
                                   type="text"/>            
                            </div>  
                         </div> 
                          <div className="col-md-4 rounded">
                                  <div className="form-group">
                                  <label className="text-light">category</label>
                                
                                      <select  onChange = {handleChange("category")}
                                              className = "form-control"
                                              placeholder = "category" >
                                                
                                            {_id && (<option selected>{findCategoryName(category)}</option>)}
                                            { !_id && (<option>Select</option>)}
                                            {categories && categories.map((category,index) =>
                                            (  <option   key = {index} 
                                                        value = {category._id}>{category.name}</option>
                                            ))}
                                      </select>
                                  </div> 
                            
                          </div> 
                     </div>  
                     <div className = "btn btn-success btn-block text-center" >
                     <input onChange = {handleChange("photo")}                                                   
                                                 type ="file"
                                                 name = "photo"
                                                 accept = "image"
                                                 placeholder = "choose image file"/> 
                      </div>
                      {successMessage()}
                     
                      {warningMessage()} 
               </form>            
             </div> 
            
                 <span>Product Image</span>
            
          </div> 
          </form>
      );
      };

      const successMessage = () => {
        return <div className = "alert alert-success fade"
                    style = {{display : createdProduct? "" : "none"}}>
                      <h4>{createdProduct}Product created successfully</h4>
                      </div>
      };
  
      const warningMessage =() => {
        if(error) return <div className = "alert alert-warning ">Product creation failed</div>
  
      }
  
   
 


    return ( 
        <div>            
           
               <div className="container-fluid">
                <div className="row width-auto ">
                    <div className="col-md-10">
                         {productForm()}                           
                      </div>
                      <div className="col-md-2 ">                             
                     
                      <div className = " my-5   fixed-side"> <AdminMenu pathname = "product"
                                                             onCreate = {handleCreate} 
                                                             onUpdate = {handleUpdate}
                                                             onDelete = {handleDelete}
                                                             onRefresh = {handleRefresh}/>  </div>    
                        </div>
                </div>
                
                 </div>     
                               
                   
            
        </div>
     );
}
 
export default ProductDashboard;