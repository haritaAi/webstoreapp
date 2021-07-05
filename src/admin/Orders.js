import React  from 'react';

import AdminMenu from '../core/crud';

const OrderDashboard = () => {
    return ( 
        <div>                  
                 <h2 className="text-white">analyze Order crud operations here</h2>
                 <div className = "container">
                     
                     <div className="row text-white p-4  ">
                        <h2> order query Form</h2>
                     </div>
                     <div className = "row">                     
                          <AdminMenu pathname = "order"/>  
                     </div>
                     
                 </div>
                
        </div>
     );
}
 
export default OrderDashboard;