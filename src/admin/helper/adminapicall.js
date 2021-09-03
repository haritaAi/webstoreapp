import { isAuthenticated } from '../../auth/helper';
import {API} from '../../backend';

//Category calls
export const createCategory = (userId,token,category)  => {
   
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",            
        headers : {
            Accept : "application/json",                  
            'Content-Type': "application/json",
            Authorization : `Bearer ${token}`,
            
        },
        body:JSON.stringify(category)
      })
            .then(response => {
                console.log("Response ::",response)
                return response.json();
            })
            .catch(err => console.log(err));

};


export const getCategory = () => {
       
       return fetch(`${API}/category`,{
            method : "GET",
                  
            }).then(response =>  {return response.json()})
                       
              .catch(err => console.log(err));
};

export const updateCategory = (categoryId, userId,token,category) => {

        //    console.log(`${API}category/${categoryId}/${userId}`);
        return  fetch(`${API}/category/${categoryId}/${userId}`,{
            method : "PUT",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(category)       
            }).then(response => {
                 console.log("Response :",response);
                 return response.json()} )                                      
              .catch(err => console.log(err));
        
};

export const deleteCategory = (categoryId,userId,token) => {
        return fetch(`${API}/category/${categoryId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        } }).then(response =>  {return response.json()} )
        .catch(err => console.log(err));

}

// /product API calls

export const createProduct = (userId,token,product) => {
    console.log("TOken in API ;", token);
          return fetch(`${API}/products/create/${userId}`,{
            method : "POST",
            headers : {
                Accept : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body: product
          })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err)
          );
};
export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method : "GET",
                  
        }).then(response =>  {return response.json()})
                   
          .catch(err => console.log(err));

};

export const getProduct = (productId) => {
      return fetch(`${API}/products/${productId}`,{
          method : "GET"
      }).then(response =>  {return response.json()} )
        .catch(err => console.log(err));
};

export const updateProduct = (productId,userId,token,product) => {
    return fetch(`${API}/products/${productId}/${userId}`,{
        method : "PUT",
        headers : {
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
            body: product 
  
    }).then(response =>  {return response.json()} )
    .catch(err => console.log(err));
};



export const deleteProduct = (productId,userId,token) => {
  
    return fetch(`${API}/products/${productId}/${userId}`,{
        method : "DELETE",
        headers : {         
            Authorization : `Bearer ${token}`
        }
       }).then(response =>  {return response.json()} )
        .catch(err => console.log(err));

}